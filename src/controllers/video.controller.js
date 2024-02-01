import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Video} from "../models/video.model.js"

const getAllVideos = asyncHandler(async(req,res)=>{
    const { title, description} = req.body;
    //TODO: get all videos based on query, sort, pagination

    if (!title || !description) {
        throw new ApiError(400, "All Fields are Required.");
    }

    // Need to complete.
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    if (!title || !description) {
        throw new ApiError(400, "All Fields are Required.");
    }
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    if (!videoId) {
        throw new ApiError(400, "Video ID is not provided in params.");
    }

    const video = await Video.findById({_id: videoId});

    return res
    .status(200)
    .json(
        new ApiResponse(200, video, "Video fetched successfully using video ID")
    );
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    if (!videoId) {
        throw new ApiError(400, "Video ID is not provided in params.");
    }
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    if (!videoId) {
        throw new ApiError(400, "Video ID is not provided in params.");
    }
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "Video ID is not provided in params.");
    }
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}