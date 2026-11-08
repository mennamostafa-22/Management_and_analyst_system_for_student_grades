// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    // 2. دوال التحليل الأكاديمي (Methods)
    calculateAverage() {
        const total = this.grades.reduce((sum, currentGrade) => sum + currentGrade, 0);
        return total / this.grades.length;
    }

    getGradeLetter(average) {
        if (average >= 90) return 'A';
        if (average >= 80) return 'B';
        if (average >= 70) return 'C';
        if (average >= 60) return 'D';
        if (average >= 50) return 'E';
        return 'F';
    }

    getFinalStatus() {
        const average = this.calculateAverage();
        if (average >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// 3. نظام تشغيل الجامعة (Objects Array)
const studentsList = [
    new Student(1, "منه الله مصطفي", [90, 92, 90], 95),
    new Student(2, "سارة علي", [40, 48, 47], 80),   // متعثر (متوسط 45)
    new Student(3, "عمر حسن", [42, 45, 45], 70),   // متعثر وسيء حضور
    new Student(4, "مني احمد", [60, 55, 65], 75)
];

// دالة (1): هنا عرض التقرير العام للطلاب في الـ HTML والـ Console
function displayGeneralReport() {
    // المخرجات للـ Console 
    console.clear();
    console.log("📑 ---- تقرير الطلاب العام ----");
    studentsList.forEach(student => {
        const avg = student.calculateAverage();
        console.log(`الاسم: ${student.name} | المتوسط: ${avg.toFixed(1)} | التقدير: ${student.getGradeLetter(avg)} | النتيجة: ${student.getFinalStatus()}`);
    });

    // العرض على صفحة الويب (HTML)
    document.getElementById('output-section').classList.remove('hidden');
    document.getElementById('stats-box').classList.add('hidden'); // إخفاء إحصائيات الرأفة مؤقتاً
    document.getElementById('table-title').innerText = "📑 تقرير الطلاب العام:";
    
    const tableHead = document.querySelector('#results-table headlines');
    const tableBody = document.getElementById('table-body');
    
    // بناء رأس الجدول
    document.querySelector('#results-table thead').innerHTML = `
        <tr>
            <th>(id)رقم الجلوس</th>
            <th>الاسم</th>
            <th>المتوسط</th>
            <th>التقدير</th>
            <th>نسبة الحضور</th>
            <th>النتيجة النهائية</th>
        </tr>
    `;

    // بناء محتوى الجدول
    tableBody.innerHTML = "";
    studentsList.forEach(student => {
        const avg = student.calculateAverage();
        const statusClass = student.getFinalStatus() === "ناجح" ? "badge-success" : "badge-warning";
        
        tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${avg.toFixed(1)}</td>
                <td>${student.getGradeLetter(avg)}</td>
                <td>${student.attendance}%</td>
                <td><span class="badge ${statusClass}">${student.getFinalStatus()}</span></td>
            </tr>
        `;
    });
}

// دالة (2): معالجة لجنة الرأفة وعرضها في الـ HTML والـ Console
function applyGracePeriod() {
    // 4. لجنة الرأفة (Array Methods)
    // أ) الاستخراج (Filter)
    const strugglingStudents = studentsList.filter(student => {
        const avg = student.calculateAverage();
        return avg >= 40 && avg <= 49;
    });

    // ب) المعالجة (Map)
    const upgradedAverages = strugglingStudents.map(student => {
        return student.calculateAverage() + 5;
    });

    // ج) التحليل (Reduce)
    const totalUpgradedAverages = upgradedAverages.reduce((sum, currentAvg) => sum + currentAvg, 0);

    // د) متوسط الرأفة مع درع الحماية
    const strugglingCount = upgradedAverages.length;
    const generalStrugglingAverage = strugglingCount > 0 ? (totalUpgradedAverages / strugglingCount) : 0;

    // المخرجات للـ Console (مطلوب في التاسك)
    console.clear();
    console.log(" ---- الطلاب المتعثرون المشمولون بالرأفة ----");
    console.log(strugglingStudents);
    console.log("\n📈 ---- درجات الرأفة الجديدة ----");
    console.log("المتوسطات بعد إضافة 5 درجات:", upgradedAverages);
    console.log(`المتوسط العام للطلاب المتعثرين بعد التعديل: ${generalStrugglingAverage.toFixed(1)}`);

    // العرض على صفحة الويب (HTML)
    document.getElementById('output-section').classList.remove('hidden');
    document.getElementById('table-title').innerText = " تقرير لجنة الرأفة (المتوسطات بعد التعديل):";
    
    document.querySelector('#results-table thead').innerHTML = `
        <tr>
            <th>الاسم</th>
            <th>المتوسط الأصلي</th>
            <th>المتوسط بعد الرأفة (+5)</th>
        </tr>
    `;

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = "";
    
    strugglingStudents.forEach((student, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.calculateAverage().toFixed(1)}</td>
                <td style="color: #e74c3c; font-weight: bold;">${upgradedAverages[index].toFixed(1)}</td>
            </tr>
        `;
    });

    // إظهار صندوق الإحصائيات العام للرأفة
    const statsBox = document.getElementById('stats-box');
    statsBox.classList.remove('hidden');
    statsBox.innerHTML = `📈 المتوسط العام للطلاب المتعثرين بعد إضافة درجات الرأفة: ${generalStrugglingAverage.toFixed(1)}`;
}
