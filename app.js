// ===============================
// JAVA MASTER — ASOSIY DASTUR
// ===============================

// Netlify Function manzili
const API_URL = "/.netlify/functions/notify";

// 27 ta dars
const lessons = [
  ["Java nima?", "Java — turli qurilmalar va tizimlarda ishlaydigan dasturlar yaratish uchun ishlatiladigan dasturlash tili.", "Java yordamida saytlarning server qismi, mobil dasturlar va boshqa tizimlar yaratiladi.", 'System.out.println("Salom, Java!");'],
  ["JDK, JRE va JVM", "JDK dastur yozish uchun kerakli vositalar to‘plami. JRE Java dasturini ishga tushirish muhitidir. JVM esa bytecode'ni bajaradi.", "JDK ichida JRE uchun kerakli qismlar va dasturlash vositalari mavjud. JVM Java kodining bajarilishini ta’minlaydi.", "Java kodi → Bytecode → JVM → Natija"],
  ["Birinchi Java dasturi", "Java dasturi odatda class ichida yoziladi. main metodi dastur bajarilishi boshlanadigan joydir.", "System.out.println() ekranga ma’lumot chiqaradi.", 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Salom!");\n  }\n}'],
  ["O‘zgaruvchilar", "O‘zgaruvchi — ma’lumotni saqlash uchun ajratilgan nomlangan joy.", "Masalan: int age = 16; bu yerda age o‘zgaruvchi nomi, 16 esa qiymat.", "int age = 16;\nString name = \"Ali\";\nSystem.out.println(age);"],
  ["Ma’lumot turlari", "Java’da int, double, char, boolean kabi oddiy turlar va String kabi obyekt turlari mavjud.", "int — butun son, double — kasr son, char — bitta belgi, boolean — true yoki false.", "int age = 16;\ndouble price = 12.5;\nchar letter = 'A';\nboolean active = true;"],
  ["Operatorlar", "Operatorlar qiymatlar ustida amallar bajaradi. Arifmetik, taqqoslash va mantiqiy operatorlar mavjud.", "+ qo‘shish, - ayirish, * ko‘paytirish, / bo‘lish, == tenglikni tekshirish.", "int a = 10;\nint b = 3;\nSystem.out.println(a + b);"],
  ["If va Else", "if shartni tekshiradi. Shart rost bo‘lsa if, aks holda else qismi bajariladi.", "Shartlar odatda taqqoslash operatorlari orqali yoziladi.", "int age = 16;\nif (age >= 18) {\n  System.out.println(\"Katta\");\n} else {\n  System.out.println(\"Kichik\");\n}"],
  ["Switch", "switch bitta qiymatni bir nechta variant bilan solishtirishga yordam beradi.", "case — variant, break — switch bajarilishini to‘xtatadi, default — mos variant topilmaganda ishlaydi.", "int day = 2;\nswitch(day) {\n  case 1: System.out.println(\"Dushanba\"); break;\n  case 2: System.out.println(\"Seshanba\"); break;\n  default: System.out.println(\"Boshqa kun\");\n}"],
  ["For sikli", "for takrorlanadigan amallarni bajarish uchun ishlatiladi.", "Unda boshlang‘ich qiymat, davom etish sharti va o‘zgarish qismi mavjud.", "for (int i = 1; i <= 5; i++) {\n  System.out.println(i);\n}"],
  ["While va Do While", "while shart rost bo‘lgan vaqt davomida ishlaydi. do while esa kamida bir marta bajariladi.", "while shartni avval tekshiradi, do while esa amalni bajarib keyin tekshiradi.", "int i = 1;\nwhile (i <= 3) {\n  System.out.println(i);\n  i++;\n}"],
  ["Massivlar", "Massiv bir xil turdagi bir nechta qiymatni bitta nom ostida saqlaydi.", "Indeks 0 dan boshlanadi. length massiv uzunligini beradi.", "int[] numbers = {10, 20, 30};\nSystem.out.println(numbers[0]);"],
  ["String", "String matnlarni saqlash uchun ishlatiladi.", "length() uzunlikni, toUpperCase() katta harflarni, toLowerCase() kichik harflarni qaytaradi.", 'String name = "Java";\nSystem.out.println(name.length());'],
  ["Metodlar", "Metod — ma’lum vazifani bajaruvchi kodlar to‘plami.", "return natijani qaytaradi. void esa qiymat qaytarmaydigan metod uchun ishlatiladi.", "static int add(int a, int b) {\n  return a + b;\n}"],
  ["Rekursiya", "Rekursiya — metodning o‘zini qayta chaqirishi.", "Rekursiyada to‘xtash sharti bo‘lishi kerak, aks holda chaqiruv davom etaveradi.", "static void count(int n) {\n  if (n == 0) return;\n  System.out.println(n);\n  count(n - 1);\n}"],
  ["Class va Object", "Class — obyekt yaratish uchun qolip. Object — shu class asosida yaratilgan nusxa.", "Class ichida maydonlar va metodlar bo‘lishi mumkin.", "class Car {\n  String color;\n  void drive() {\n    System.out.println(\"Yurmoqda\");\n  }\n}\nCar myCar = new Car();"],
  ["Constructor", "Constructor obyekt yaratilganda avtomatik chaqiriladigan maxsus qism.", "Uning nomi class nomi bilan bir xil bo‘ladi va qaytarish turi yozilmaydi.", "class Car {\n  Car() {\n    System.out.println(\"Yangi mashina\");\n  }\n}"],
  ["This", "this joriy obyektning o‘ziga murojaat qilish uchun ishlatiladi.", "Ko‘pincha class maydoni va metod parametri nomi bir xil bo‘lganda qo‘llanadi.", "class User {\n  String name;\n  User(String name) {\n    this.name = name;\n  }\n}"],
  ["Encapsulation", "Encapsulation — ma’lumotlarni himoyalash va ularga boshqariladigan usulda murojaat qilish tamoyili.", "Maydonlar private qilinadi. Ularga get va set metodlari orqali murojaat qilish mumkin.", "class Bank {\n  private int balance = 1000;\n  public int getBalance() {\n    return balance;\n  }\n}"],
  ["Inheritance", "Inheritance — bir class boshqa classning xususiyat va metodlarini meros qilib olishi.", "extends kalit so‘zi orqali meros olish amalga oshiriladi.", "class Animal {\n  void eat() { System.out.println(\"Yeydi\"); }\n}\nclass Dog extends Animal {}"],
  ["Polymorphism", "Polymorphism — bir xil metod chaqiruvi turli obyektlarda turlicha natija berishi.", "Override orqali voris class ota class metodining o‘z versiyasini yozishi mumkin.", "class Animal {\n  void sound() { System.out.println(\"Ovoz\"); }\n}\nclass Dog extends Animal {\n  @Override\n  void sound() { System.out.println(\"Vov-vov\"); }\n}"],
  ["Abstraction", "Abstraction — keraksiz ichki tafsilotlarni yashirib, muhim xususiyatlarni ko‘rsatish.", "abstract class ichida abstract metod bo‘lishi mumkin. Voris class uni amalga oshiradi.", "abstract class Animal {\n  abstract void sound();\n}\nclass Cat extends Animal {\n  void sound() { System.out.println(\"Miyov\"); }\n}"],
  ["Interface", "Interface class bajarishi kerak bo‘lgan metodlar kelishuvini belgilaydi.", "Bir class bir nechta interface'ni implements orqali amalga oshirishi mumkin.", "interface Fly {\n  void fly();\n}\nclass Bird implements Fly {\n  public void fly() {\n    System.out.println(\"Uchmoqda\");\n  }\n}"],
  ["Static va Final", "static classning o‘ziga tegishli. final esa qayta qiymat berish yoki o‘zgartirishni cheklaydi.", "static metod obyekt yaratmasdan chaqirilishi mumkin. final o‘zgaruvchiga qayta qiymat berilmaydi.", "static int count = 0;\nfinal int MAX = 100;"],
  ["Access Modifiers", "Access modifier class, metod va maydonlardan qayerda foydalanish mumkinligini belgilaydi.", "public — keng foydalanish, private — faqat class ichida, protected — meros va paket doirasida.", "public class User {\n  private String password;\n  public String name;\n}"],
  ["Exception Handling", "Exception — dastur bajarilishida yuzaga keladigan xatolik holati.", "try xavfli kodni, catch xatoni ushlashni, finally esa yakuniy amalni bajaradi.", "try {\n  int x = 10 / 0;\n} catch (Exception e) {\n  System.out.println(\"Xatolik\");\n}"],
  ["CRUD", "CRUD ma’lumotlar bilan ishlashning to‘rtta asosiy amalidir.", "Create — yaratish, Read — o‘qish, Update — yangilash, Delete — o‘chirish.", "CREATE → ma’lumot qo‘shish\nREAD → ma’lumotni ko‘rish\nUPDATE → o‘zgartirish\nDELETE → o‘chirish"],
  ["ArrayList va Collections", "ArrayList — hajmi o‘zgarib turadigan ro‘yxat.", "add() element qo‘shadi, get() elementni oladi, remove() o‘chiradi, size() uzunlikni qaytaradi.", "ArrayList<String> names = new ArrayList<>();\nnames.add(\"Ali\");\nnames.add(\"Vali\");\nSystem.out.println(names.get(0));"]
];

// Har bir mavzu uchun asosiy savol
const topicQuestions = [
  ["Java nima?", "Dasturlash tili", ["Operatsion tizim", "Brauzer", "Kompyuter qurilmasi"]],
  ["JDK nima?", "Java dasturlash vositalari to‘plami", ["Faqat matn muharriri", "Faqat JVM", "Ma’lumotlar bazasi"]],
  ["Java dasturi qayerdan boshlanadi?", "main metodi", ["constructor", "final", "package"]],
  ["O‘zgaruvchi nima?", "Ma’lumot saqlovchi nomlangan joy", ["Faqat metod", "Class nomi", "Sikl turi"]],
  ["int nimani saqlaydi?", "Butun son", ["Matn", "Kasr son", "Faqat true/false"]],
  ["Java’da qo‘shish operatori qaysi?", "+", ["*", "==", "&&"]],
  ["if nima qiladi?", "Shartni tekshiradi", ["Massiv yaratadi", "Class yaratadi", "Matnni o‘chiradi"]],
  ["switch nima uchun ishlatiladi?", "Bir qiymatni variantlar bilan solishtirish", ["Obyekt yaratish", "Meros olish", "Xatoni ushlash"]],
  ["for nima uchun ishlatiladi?", "Takrorlash uchun", ["Ma’lumot yashirish", "Class yaratish", "Qiymat qaytarish"]],
  ["while qachon davom etadi?", "Shart rost bo‘lganda", ["Har doim bir marta", "Faqat shart yolg‘on bo‘lsa", "Faqat dastur tugaganda"]],
  ["Massiv indeksi nechadan boshlanadi?", "0", ["1", ["-1", "2"]]],
  ["String nima uchun?", "Matn saqlash uchun", ["Butun son", "Mantiqiy qiymat", "Sikl"]],
  ["return nima qiladi?", "Qiymatni qaytaradi", ["Class yaratadi", "Siklni boshlaydi", "O‘zgaruvchini yashiradi"]],
  ["Rekursiya nima?", "Metodning o‘zini chaqirishi", ["Classdan meros olish", "Matnni solishtirish", "Massivni o‘chirish"]],
  ["Class nima?", "Obyekt yaratish qolipi", ["Faqat o‘zgaruvchi", "Sikl turi", "Operator"]],
  ["Constructor qachon chaqiriladi?", "Obyekt yaratilganda", ["Dastur o‘chirilganda", "Har bir siklda", "Faqat return bo‘lganda"]],
  ["this nimani anglatadi?", "Joriy obyektni", ["Ota classni", "Yangi massivni", "JVMni"]],
  ["Encapsulation nimani anglatadi?", "Ma’lumotni himoyalash va boshqarish", ["Faqat sikl", "Meros olish", "Kod chiqarish"]],
  ["extends nima uchun?", "Meros olish uchun", ["Metoddan chiqish", "Matn yozish", "Xatoni ushlash"]],
  ["Override nima?", "Voris classda metodni qayta aniqlash", ["Yangi massiv", "O‘zgaruvchi turi", "Dastur nomi"]],
  ["Abstraction nima?", "Muhim jihatlarni ko‘rsatib, ichki tafsilotlarni yashirish", ["Faqat meros", "Faqat sikl", "Faqat son chiqarish"]],
  ["implements nima uchun?", "Interface'ni amalga oshirish uchun", ["Classni o‘chirish", "Siklni to‘xtatish", "Qiymat qaytarish"]],
  ["final o‘zgaruvchi nima?", "Qayta qiymat berib bo‘lmaydigan o‘zgaruvchi", ["Har doim o‘zgaruvchi", "Faqat matn", "Metod chaqiruvi"]],
  ["private nimani bildiradi?", "Faqat class ichida foydalanish", ["Hamma joyda ochiq", "Faqat internetda", "Faqat JVMda"]],
  ["catch nima qiladi?", "Xatoni ushlaydi", ["Obyekt yaratadi", "Meros oladi", "Massivni saralaydi"]],
  ["CRUDdagi C nimani anglatadi?", "Create", ["Copy", "Class", "Check"]],
  ["ArrayList nimasi bilan farq qiladi?", "Hajmi o‘zgarishi mumkin", ["Faqat bitta qiymat saqlaydi", "Faqat matn chiqaradi", "Hajmi doim 1"]]
];

// Umumiy kod savollari
const codeQuestions = [
  { q: "Kod natijasi nima?", code: "System.out.println(5 + 3);", a: "8", o: ["53", "8", "5", "3"] },
  { q: "Kod natijasi nima?", code: "int x = 4;\nSystem.out.println(x * 2);", a: "8", o: ["6", "4", "8", "2"] },
  { q: "Kod natijasi nima?", code: 'String s = "Java";\nSystem.out.println(s.length());', a: "4", o: ["3", "5", "4", "Java"] },
  { q: "Kod natijasi nima?", code: "for(int i=1; i<=3; i++) {\n  System.out.print(i);\n}", a: "123", o: ["012", "123", "321", "111"] },
  { q: "Kod natijasi nima?", code: "int[] a = {7, 9, 12};\nSystem.out.println(a[1]);", a: "9", o: ["7", "12", "1", "9"] }
];

const commonQuestions = [
  { q: "Java'da matn turi qaysi?", a: "String", o: ["int", "boolean", "double"] },
  { q: "Ekranga chiqarish buyrug‘i qaysi?", a: "System.out.println()", o: ["Scanner()", "return()", "extends()"] },
  { q: "Java'da tenglikni tekshirish operatori qaysi?", a: "==", o: ["=", "!=", "++"] },
  { q: "Metod qiymat qaytarmasa qaysi tur yoziladi?", a: "void", o: ["int", "String", "return"] },
  { q: "Obyekt yaratish uchun qaysi kalit so‘z ishlatiladi?", a: "new", o: ["this", "static", "final"] }
];

let student = null;
let currentLesson = 0;
let currentQuestions = [];
let questionIndex = 0;
let answers = [];
let selectedAnswer = null;
let testLesson = 0;
let lastPassed = false;

const $ = id => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  $(id).classList.remove("hidden");
}

function makeId() {
  return crypto.randomUUID();
}

async function api(action, data = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...data })
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Server xatosi");
  return result;
}

async function logEvent(event, extra = {}) {
  if (!student) return;
  try {
    await api("event", {
      studentId: student.id,
      name: student.name,
      event,
      lesson: currentLesson + 1,
      details: extra
    });
  } catch (error) {
    console.error("Ma’lumot yuborilmadi:", error);
  }
}

$("startForm").addEventListener("submit", async e => {
  e.preventDefault();

  const name = $("studentName").value.trim();
  if (name.length < 2) {
    alert("Ismingizni to‘liqroq kiriting.");
    return;
  }

  student = {
    id: localStorage.getItem("javaMasterId") || makeId(),
    name
  };

  localStorage.setItem("javaMasterId", student.id);
  localStorage.setItem("javaMasterName", name);

  try {
    const data = await api("start", { studentId: student.id, name });
    student.progress = data.student;
    $("userLabel").textContent = name;
    await logEvent("Kursga kirdi");
    renderCourse();
    showScreen("courseScreen");
  } catch (error) {
    alert("Server bilan bog‘lanib bo‘lmadi. " + error.message);
  }
});

function renderCourse() {
  const p = student.progress || {};
  const passed = Number(p.passed_lessons || 0);
  const attempts = Number(p.attempts || 0);

  $("passedCount").textContent = `${passed}/27`;
  $("progressPercent").textContent = `${Math.round(passed / 27 * 100)}%`;
  $("attemptCount").textContent = attempts;
  $("progressBar").style.width = `${passed / 27 * 100}%`;

  $("lessonList").innerHTML = lessons.map((lesson, i) => {
    const unlocked = i <= passed;
    const done = i < passed;
    return `
      <div class="lesson-card ${unlocked ? "" : "locked"}" data-index="${i}">
        <div>
          <h3>${i + 1}. ${lesson[0]}</h3>
          <p>${done ? "Mavzu yakunlangan" : unlocked ? "O‘rganishga tayyor" : "Avvalgi mavzuni yakunlang"}</p>
        </div>
        <span class="lesson-status">${done ? "✓ Bajarildi" : unlocked ? "Boshlash →" : "🔒"}</span>
      </div>`;
  }).join("");

  document.querySelectorAll(".lesson-card").forEach(card => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.index);
      if (index > passed) return;
      openLesson(index);
    });
  });
}

async function openLesson(index) {
  currentLesson = index;
  await logEvent("Mavzuga kirdi", { title: lessons[index][0] });

  $("lessonNumber").textContent = `MAVZU ${index + 1} / 27`;
  $("lessonTitle").textContent = lessons[index][0];

  const lesson = lessons[index];
  $("lessonContent").innerHTML = `
    <h3>📘 Qisqacha tushuncha</h3>
    <p>${lesson[1]}</p>
    <h3>💡 Eslab qoling</h3>
    <p>${lesson[2]}</p>
    <h3>💻 Misol</h3>
    <pre>${escapeHtml(lesson[3])}</pre>
  `;

  showScreen("lessonScreen");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  })[c]);
}

$("backToCourse").onclick = async () => {
  await logEvent("Mavzular ro‘yxatiga qaytdi");
  renderCourse();
  showScreen("courseScreen");
};

$("startTestBtn").onclick = async () => {
  testLesson = currentLesson;
  questionIndex = 0;
  answers = [];

  const topic = topicQuestions[testLesson];
  const topicQuestion = {
    q: topic[0],
    a: topic[1],
    o: topic[2]
  };

  // 10 ta savol: mavzuga oid 5 ta va umumiy Java bo‘yicha 5 ta
  currentQuestions = [
    topicQuestion,
    ...codeQuestions,
    ...commonQuestions
  ];

  currentQuestions = currentQuestions.map(q => ({
    ...q,
    o: [...q.o].sort(() => Math.random() - 0.5)
  }));

  await logEvent("Testni boshladi", { title: lessons[testLesson][0] });
  showScreen("testScreen");
  renderQuestion();
};

function renderQuestion() {
  selectedAnswer = null;
  const q = currentQuestions[questionIndex];

  $("questionCounter").textContent = `SAVOL ${questionIndex + 1} / ${currentQuestions.length}`;
  $("testProgress").style.width = `${questionIndex / currentQuestions.length * 100}%`;
  $("questionType").textContent = q.code ? "KOD NATIJASINI TOPING" : "BILIMNI TEKSHIRISH";
  $("questionText").textContent = q.q;
  $("codeArea").classList.toggle("hidden", !q.code);
  $("codeArea").innerHTML = q.code ? `<pre>${escapeHtml(q.code)}</pre>` : "";

  $("questionOptions").innerHTML = q.o.map((option, i) => `
    <button class="option" data-answer="${escapeHtml(option)}">
      ${String.fromCharCode(65 + i)}. ${escapeHtml(option)}
    </button>
  `).join("");

  document.querySelectorAll(".option").forEach(button => {
    button.onclick = () => {
      selectedAnswer = button.dataset.answer;
      document.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
      button.classList.add("selected");
      $("nextQuestionBtn").disabled = false;
    };
  });

  $("nextQuestionBtn").disabled = true;
  $("nextQuestionBtn").textContent =
    questionIndex === currentQuestions.length - 1 ? "Natijani ko‘rish" : "Keyingi savol →";
}

$("nextQuestionBtn").onclick = () => {
  if (selectedAnswer === null) return;

  answers.push({
    question: currentQuestions[questionIndex].q,
    selected: selectedAnswer,
    correct: currentQuestions[questionIndex].a,
    isCorrect: selectedAnswer === currentQuestions[questionIndex].a
  });

  questionIndex++;

  if (questionIndex < currentQuestions.length) {
    renderQuestion();
  } else {
    finishTest();
  }
};

async function finishTest() {
  const correct = answers.filter(a => a.isCorrect).length;
  const score = Math.round(correct / currentQuestions.length * 100);
  const passed = score >= 90;

  lastPassed = passed;

  try {
    const result = await api("result", {
      studentId: student.id,
      name: student.name,
      lesson: testLesson + 1,
      lessonTitle: lessons[testLesson][0],
      score,
      correct,
      total: currentQuestions.length,
      passed,
      errors: currentQuestions.length - correct,
      answers
    });

    student.progress = result.student;
  } catch (error) {
    console.error(error);
    alert("Natija serverga yuborilmadi. Internetni tekshiring.");
  }

  $("resultScore").textContent = `${score}%`;
  $("resultIcon").textContent = passed ? "✓" : "↻";
  $("resultIcon").style.color = passed ? "var(--green)" : "var(--red)";
  $("resultMessage").textContent = passed
    ? "Tabriklaymiz! Siz 90% yoki undan yuqori natija oldingiz. Keyingi mavzu ochildi."
    : "Hozircha 90% ga yetmadingiz. Mavzuni qayta o‘rganib, testni yana topshiring.";

  $("resultActionBtn").textContent = passed ? "Davom etish →" : "Qayta urinish ↻";
  showScreen("resultScreen");
}

$("resultActionBtn").onclick = () => {
  if (lastPassed && testLesson < lessons.length - 1) {
    currentLesson = testLesson + 1;
    openLesson(currentLesson);
  } else {
    renderCourse();
    showScreen("courseScreen");
  }
};

$("exitTestBtn").onclick = async () => {
  await logEvent("Testdan chiqdi");
  openLesson(testLesson);
};

$("logoutBtn").onclick = () => {
  student = null;
  $("userLabel").textContent = "";
  showScreen("welcomeScreen");
};

$("adminBackBtn").onclick = () => {
  renderCourse();
  showScreen("courseScreen");
};

// Administrator bo‘limi: brauzer manziliga #admin yozing
async function openAdmin() {
  const password = prompt("Administrator parolini kiriting:");
  if (!password) return;

  try {
    const data = await api("admin", { password });
    $("adminData").innerHTML = data.students.map(s => `
      <div class="admin-student">
        <h3>${escapeHtml(s.name)}</h3>
        <p>Yakunlangan mavzular: ${s.passed_lessons}/27</p>
        <p>Urinishlar: ${s.attempts} · Xatolar: ${s.errors}</p>
        <p>Oxirgi natija: ${s.last_score ?? 0}%</p>
        <p>Oxirgi faollik: ${new Date(s.updated_at).toLocaleString("uz-UZ")}</p>
      </div>
    `).join("") || "<p>Hozircha o‘quvchilar yo‘q.</p>";

    showScreen("adminScreen");
  } catch (error) {
    alert("Kirish rad etildi: " + error.message);
  }
}

if (location.hash === "#admin") openAdmin();

const savedName = localStorage.getItem("javaMasterName");
const savedId = localStorage.getItem("javaMasterId");

if (savedName && savedId && location.hash !== "#admin") {
  $("studentName").value = savedName;
}

// Admin tugmasi: Ctrl + Shift + A
document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
    openAdmin();
  }
});
