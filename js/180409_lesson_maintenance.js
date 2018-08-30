const gradesObj = {
  "A+" : 4.5,
  "A" : 4.0,
  "B+" : 3.5,
  "B" : 3.0,
  "C+" : 2.5,
  "C" : 2.0,
  "D+" : 1.5,
  "D" : 1.0,
  "F" : 0
}

const GradeCalculator = {
  data : {
    lectures : [],
    report : {
      GPA: 0,
      credits: 0,
      majorGPA: 0,
      majorCredits: 0
    }
  },
  addLecture : function(lectures){
    this.data.lectures.push(lectures);
  },
  setReport: function(){
    let report = this.data.report;
    ({GPA: report.GPA, credits: report.credits} = this.calcGrades(this.data.lectures));
    ({GPA: report.majorGPA, credits: report.majorCredits} = this.calcGrades(this.getMajor(this.data.lectures)));
  },
  showReport: function(){
    this.setReport();
    console.log(this.data.report);
  },
  calcGrades: function(lectures){
    let credits = 0;
    let totalScore = 0;
    let GPA = 0;
    lectures.forEach(lecture =>{
      credits += lecture.credit;
      totalScore += gradesObj[lecture.grade] * lecture.credit;
    });
    GPA = (totalScore/credits).toFixed(2);
    return {GPA: GPA, credits: credits};
  },
  getMajor: function(lectures){
    return lectures.filter(lecture => lecture.major);
  }
}
var data =  [ 
              {
                  'name' : '데이터베이스', 
                  'grade' : 'A', 
                  'credit' : 3,
                  'major' : true
              },
              {
                  'name' : '교양영어', 
                  'grade' : 'B+', 
                  'credit' : 2,
                  'major' : false
              },
              {
                  'name' : '철학', 
                  'grade' : 'B+', 
                  'credit' : 1,
                  'major' : false
              }
];

var adddata = [
  {
      'name' : '자료구조', 
      'grade' : 'A+', 
      'credit' : 3,
      'major' : true
  }
]

GradeCalculator.addLecture(data);
console.log(GradeCalculator.calcGrades(data));
console.log(GradeCalculator.calcGrades(GradeCalculator.getMajor(data)));
GradeCalculator.showReport();
// GradeCalculator.calcGradeReport();
// GradeCalculator.showReport();
// GradeCalculator.addLecture(adddata);
// GradeCalculator.calcGradeReport();
// GradeCalculator.showReport();