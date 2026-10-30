const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};

const json = (statusCode, data) => ({
  statusCode,
  headers,
  body: JSON.stringify(data)
});

async function supabase(path, options = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase sozlamalari topilmadi.");
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Supabase xatosi: ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

async function telegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      })
    });
  } catch (error) {
    console.error("Telegram xabari yuborilmadi:", error);
  }
}

function safe(value, max = 500) {
  return String(value ?? "").slice(0, max)
    .replace(/[<>&]/g, char => ({
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;"
    })[char]);
}

exports.handler = async event => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Faqat POST so‘rovi qabul qilinadi." });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const action = body.action;

    // Yangi o‘quvchini ro‘yxatdan o‘tkazish
    if (action === "start") {
      const { studentId, name } = body;

      if (!studentId || !name || name.trim().length < 2) {
        return json(400, { error: "Ism yoki o‘quvchi ID noto‘g‘ri." });
      }

      const existing = await supabase(
        `students?id=eq.${encodeURIComponent(studentId)}&select=*`
      );

      if (existing.length) {
        await supabase(`students?id=eq.${encodeURIComponent(studentId)}`, {
          method: "PATCH",
          body: JSON.stringify({
            name: name.trim().slice(0, 50),
            updated_at: new Date().toISOString()
          }),
          headers: { Prefer: "return=representation" }
        });
      } else {
        await supabase("students", {
          method: "POST",
          body: JSON.stringify({
            id: studentId,
            name: name.trim().slice(0, 50),
            current_lesson: 1,
            passed_lessons: 0,
            attempts: 0,
            errors: 0,
            back_count: 0,
            last_score: 0,
            updated_at: new Date().toISOString()
          }),
          headers: { Prefer: "return=representation" }
        });

        await telegram(
          `🟣 <b>Yangi o‘quvchi!</b>\n\n` +
          `👤 Ism: ${safe(name)}\n` +
          `🆔 ID: <code>${safe(studentId)}</code>`
        );
      }

      const students = await supabase(
        `students?id=eq.${encodeURIComponent(studentId)}&select=*`
      );

      return json(200, { student: students[0] });
    }

    // O‘quvchi faoliyatini yozib borish
    if (action === "event") {
      const { studentId, name, event: eventName, lesson, details } = body;

      if (!studentId || !eventName) {
        return json(400, { error: "Faoliyat ma’lumoti yetarli emas." });
      }

      await supabase("activity", {
        method: "POST",
        body: JSON.stringify({
          student_id: studentId,
          student_name: safe(name, 50),
          event: safe(eventName, 100),
          lesson: Number(lesson || 0),
          details: details || {}
        })
      });

      if (eventName === "Mavzular ro‘yxatiga qaytdi") {
        const current = await supabase(
          `students?id=eq.${encodeURIComponent(studentId)}&select=back_count`
        );

        if (current.length) {
          await supabase(`students?id=eq.${encodeURIComponent(studentId)}`, {
            method: "PATCH",
            body: JSON.stringify({
              back_count: Number(current[0].back_count || 0) + 1,
              updated_at: new Date().toISOString()
            })
          });
        }
      }

      return json(200, { success: true });
    }

    // Test natijasini saqlash
    if (action === "result") {
      const {
        studentId, name, lesson, lessonTitle,
        score, correct, total, passed, errors, answers
      } = body;

      if (!studentId || !Number.isInteger(Number(lesson)) ||
          Number(lesson) < 1 || Number(lesson) > 27) {
        return json(400, { error: "Test ma’lumotlari noto‘g‘ri." });
      }

      const rows = await supabase(
        `students?id=eq.${encodeURIComponent(studentId)}&select=*`
      );

      if (!rows.length) {
        return json(404, { error: "O‘quvchi topilmadi." });
      }

      const old = rows[0];
      const newPassed = passed
        ? Math.max(Number(old.passed_lessons || 0), Number(lesson))
        : Number(old.passed_lessons || 0);

      const updated = await supabase(
        `students?id=eq.${encodeURIComponent(studentId)}&select=*`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: safe(name, 50),
            passed_lessons: newPassed,
            current_lesson: Math.min(newPassed + 1, 27),
            attempts: Number(old.attempts || 0) + 1,
            errors: Number(old.errors || 0) + Number(errors || 0),
            last_score: Number(score || 0),
            updated_at: new Date().toISOString()
          }),
          headers: { Prefer: "return=representation" }
        }
      );

      await supabase("activity", {
        method: "POST",
        body: JSON.stringify({
          student_id: studentId,
          student_name: safe(name, 50),
          event: "Test natijasi",
          lesson: Number(lesson),
          details: {
            lessonTitle: safe(lessonTitle, 100),
            score: Number(score),
            correct: Number(correct),
            total: Number(total),
            passed: Boolean(passed),
            errors: Number(errors),
            answers: Array.isArray(answers) ? answers : []
          }
        })
      });

      await telegram(
        `📊 <b>JAVA MASTER — TEST NATIJASI</b>\n\n` +
        `👤 O‘quvchi: ${safe(name)}\n` +
        `📚 Mavzu: ${Number(lesson)}. ${safe(lessonTitle)}\n` +
        `🎯 Natija: <b>${Number(score)}%</b>\n` +
        `✅ To‘g‘ri: ${Number(correct)}/${Number(total)}\n` +
        `❌ Xato: ${Number(errors)}\n` +
        `${passed ? "🟢 Mavzu ochildi!" : "🔴 Qayta topshirishi kerak."}`
      );

      return json(200, { success: true, student: updated[0] });
    }

    // Administrator ma’lumotlari
    if (action === "admin") {
      const password = process.env.ADMIN_PASSWORD;

      if (!password || body.password !== password) {
        return json(401, { error: "Parol noto‘g‘ri." });
      }

      const students = await supabase(
        "students?select=*&order=updated_at.desc"
      );

      return json(200, { students });
    }

    return json(400, { error: "Noma’lum so‘rov." });

  } catch (error) {
    console.error(error);
    return json(500, { error: "Serverda xatolik yuz berdi." });
  }
};
