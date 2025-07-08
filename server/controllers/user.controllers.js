import {  User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { Response } from '../utils/Response.js';

// generateAccessToken and generateRefreshToken 
const generateTokens = async (userId) => {
   const user =  await User.findById(userId);
    if (!user) {
         throw new ApiError(404, 'User not found');
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    // Save the refresh token in the user model
    user.refreshToken = refreshToken;
    await user.save({
        validateBeforeSave: false // Skip validation for refreshToken field
    });
    return { accessToken, refreshToken };
}
// Controller for user registration
export const registerUser = asyncWrapper(async (req, res) => {
    const {email,fullname,password,username} = req.body; // Destructure the request body if needed
    // Validate required fields
    if([email, fullname, password, username].some(field => field.trim() ===  "")) {
        throw new ApiError(400, 'All fields are required');
    }
    // check if the user already exists
    const userExist =  await User.findOne(
        // check by email or username
        { $or:[{ email }, { username }] }
     )
    if(userExist){
        throw new ApiError(400, 'User already exists with this email or username');
    }
    // create a new user
    const user =  await User.create({
        email: email,
        fullname: fullname,
        username: username,
        password: password // Ensure you hash the password before saving it in the model
    })
    if(!user){
        throw new ApiError(500, 'User registration failed');
    }
    const createdUser = await User.findById(user._id).select('-password -refreshToken'); // Exclude sensitive fields from the response
    res.status(201).json(
        new Response(
            201,
            createdUser,
            'User registered successfully',
        )
    )
});

// You can add more user-related controllers here, such as login, logout, etc.
export const loginUser = asyncWrapper( async (req, res) => {
    // get the user credentials from the request body
    const {email, username, password} = req.body;
    // ensure at least one of email or username is provided
    if(!email && !username) {
        throw new ApiError(400, 'Email or username is required');
    }
    // ensure password is provided
    if(!password) {
        throw new ApiError(400, 'Password is required');
    }
    // find the user by email or username
    const user =  await User.findOne({
        $or : [{ email }, { username }]
    })
    // check if the user exists
    if(!user) {
        throw new ApiError(404, 'User not found');
    }
    // check if the password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect) {
        throw new ApiError(401, 'Invalid password');
    }
    // generate access and refresh tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);
    //remove sensitive fields from the user object
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken'); 
    // send the response with tokens and user data
    const options = {
        httpOnly: true, // Ensure cookies are only sent over HTTPS
        secure : true
    }
    res.status(200)
    .cookie('refreshToken', refreshToken, options)
    .cookie('accessToken', accessToken, options)
    .json(
        new Response(
            200,
            {user:loggedInUser},
            'User logged in successfully'
        )
    )
})
// logoutUser controller
export const logoutUser = asyncWrapper(async (req, res) => {
    const userId = req.user._id;
    // find the user by ID And clear the refresh token
    const user = await User.findByIdAndUpdate(userId, {
        $unset: {
            refreshToken : 1 // Unset the refreshToken field
        }
       },{
        new : true,
       }
   );
   const options = {
         httpOnly: true, // Ensure cookies are only sent over HTTPS
         secure : true,
   }
   res.status(200)
    .clearCookie('refreshToken', options)
    .clearCookie('accessToken', options)
    .json(
        new Response(
            200,
            {},
            'User logged out successfully'
        )
    );
})

//get curr user controller
export const getCurrUser = asyncWrapper(async (req, res) => {
    const userId = req?.user?._id;
    if (!userId) {
        throw new ApiError(400, 'User ID is required');
    }
    // Find the user by ID and exclude sensitive fields
    const user = await User.findById(userId).select('-password -refreshToken');
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    res.status(200).json(
        new Response(
            200,
            user,
            'User profile retrieved successfully'   
        )
    )
})


//get all user by searchterm 
export const searchUsers = asyncWrapper(async (req, res) => {
    const searchTerm = req.query.searchTerm
    if (!searchTerm) {
        throw new ApiError(400, "SearchTerm is required")
    }
    const users = await User.find({fullname : searchTerm}).select("-password -refreshToken")
    

    res.status(201).json(
        new Response(201, users, "Searched successfully")
    )
})
