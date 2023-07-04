// Cấu hình Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDXBVztdQHkcK0WIG5oP73ZL1uVdt8PbgE",
  authDomain: "appxinxo.firebaseapp.com",
  databaseURL: "https://appxinxo-default-rtdb.firebaseio.com/",
  projectId: "appxinxo",
  storageBucket: "appxinxo.appspot.com",
  messagingSenderId: "694579995875",
  appId: "1:694579995875:web:9ed8a86865d0ef0a03d1d6"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Tham chiếu đến node "users" trên Firebase Realtime Database
var usersRef = firebase.database().ref("users");

// Lấy danh sách người dùng từ Firebase Realtime Database
usersRef.on("value", function(snapshot) {
  var users = snapshot.val();
  var usersList = document.getElementById("users");

  // Hiển thị danh sách người dùng
  usersList.innerHTML = "<h2>Users</h2>";
  for (var userId in users) {
    var user = users[userId];
    var userElement = document.createElement("div");
    userElement.innerHTML = "<p><strong>User ID:</strong> " + userId + "</p>" +
                            "<p><strong>Name:</strong> " + user.name + "</p>";

    // Xử lý sự kiện khi người dùng được click
    userElement.addEventListener("click", function() {
      showClassrooms(userId);
    });

    usersList.appendChild(userElement);
  }
});

// Hiển thị danh sách lớp học của một người dùng
function showClassrooms(userId) {
  var classroomsRef = firebase.database().ref("users/" + userId + "/classrooms");

  // Lấy danh sách lớp học từ Firebase Realtime Database
  classroomsRef.on("value", function(snapshot) {
    var classrooms = snapshot.val();
    var classroomsList = document.getElementById("classrooms");

    // Hiển thị danh sách lớp học
    classroomsList.innerHTML = "<h2>Classrooms</h2>";
    for (var classroomId in classrooms) {
      var classroom = classrooms[classroomId];
            var classroomElement = document.createElement("div");
      classroomElement.innerHTML = "<p><strong>Classroom ID:</strong> " + classroomId + "</p>" +
                                  "<p><strong>Classroom Name:</strong> " + classroom.name + "</p>";

      // Xử lý sự kiện khi lớp học được click
      classroomElement.addEventListener("click", function() {
        showStudents(userId, classroomId);
      });

      classroomsList.appendChild(classroomElement);
    }
  });
}

// Hiển thị danh sách học sinh trong một lớp học
function showStudents(userId, classroomId) {
  var studentsRef = firebase.database().ref("users/" + userId + "/classrooms/" + classroomId + "/students");

  // Lấy danh sách học sinh từ Firebase Realtime Database
  studentsRef.on("value", function(snapshot) {
    var students = snapshot.val();
    var studentsList = document.getElementById("students");

    // Hiển thị danh sách học sinh
    studentsList.innerHTML = "<h2>Students</h2>";
    for (var studentId in students) {
      var student = students[studentId];
      var studentElement = document.createElement("div");
      studentElement.innerHTML = "<p><strong>Student ID:</strong> " + studentId + "</p>" +
                                 "<p><strong>Student Name:</strong> " + student.name + "</p>";

      studentsList.appendChild(studentElement);
    }
  });
}
