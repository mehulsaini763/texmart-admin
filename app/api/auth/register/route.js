const registerAdmin = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
  
    // validation
    if (!req.file) {
      res.status(400).json(new NonStandardApiError("Avatar Doesn't Exists"));
      throw new Error("Avatar Doesn't Exists");
    }
  
    if ([fullName, email, password].some((field) => field?.trim() == "")) {
      res.status(400).json(new NonStandardApiError("Some Fields are Empty"));
      throw new Error("Some Fields are Empty");
    }
    // check admin exsistance
    const exists = await Admin.findOne({ email });
    if (exists) {
      res.status(400).json(new NonStandardApiError("Email Already Exists"));
      throw new Error("Email Already Exists");
    }
  
    // upload image
    const avatar = await uploadOnCloudinary(req.file.path);
  
    // create user
    const admin = await Admin.create({
      avatar,
      fullName,
      email,
      password,
    });
  
    // response
    if (admin)
      res
        .status(201)
        .json(new NonStandardApiResponse("Registered Successfully", admin));
  });
