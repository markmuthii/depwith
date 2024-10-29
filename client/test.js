// const student = {
//   firstName: "John Doe",
//   age: 30,
// };

// Update this code such that calling the setFirstName function below will set the first name of the student to be whatever is passed when the function is called
function useStudents() {
  const student = {
    firstName: "Jane",
  };

  const renameName = (value) => {};

  return [student, renameName];
}

const [student, setFirstName] = useStudents();

// Calling this should update the firstName of student to be Judy
setFirstName("Judy");

// const { firstName } = student;

// console.log(firstName);
