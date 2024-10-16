export const validateUserRegistration = (req, res, next) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    res.status(400).json({
      message: "All fields are required.",
    });
    return;
  }

  if (username.trim() === "") {
    res.status(400).json({
      message: "Username cannot be empty",
    });
    return;
  }

  // email: john@doe.com
  // emailArray: ["john", "doe.com"]
  // const emailArray = email.split("@");

  // if (!emailArray[0] || !emailArray[1]) {
  //   res.status(400).json({
  //     message: "Email is invalid",
  //   });
  //   return;
  // }

  // // second part: doe.com
  // // emailSecondPart: ["doe", "com"]
  // const emailSecondPart = emailArray[1].split(".");

  // if (!emailSecondPart[0] || !emailSecondPart[1]) {
  //   res.status(400).json({
  //     message: "Email is invalid 2",
  //   });
  //   return;
  // }

  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

  if (!emailRegex.test(email)) {
    res.status(400).json({
      message: "Email is invalid 3",
    });
    return;
  }

  // Force the user to use a password that is at least 6 characters long, and contains a number, small letter, and capital letter
  // Eg, Passw0 is a valid password

  next();
};

export const validateUserLogin = (req, res, next) => {
  // Validate the login request data here

  console.log("Validating user login");
  next();
};
