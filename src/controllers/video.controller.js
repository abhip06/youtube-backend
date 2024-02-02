import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js"
import { uploadOnCloudinary } from "../utils/cloudinaryService.js";

const getAllVideos = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    //TODO: get all videos based on query, sort, pagination

    if (!title || !description) {
        throw new ApiError(400, "All Fields are Required.");
    }

    // Need to complete.
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    // TODO: get video, upload to cloudinary, create video

    if (!title || !description) {
        throw new ApiError(400, "All Fields are Required.");
    }

    const videoFileLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!videoFileLocalPath) {
        throw new ApiError(400, "Video file is missing.");
    }

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail image is missing.");
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!videoFile) {
        throw new ApiError(400, "Video file is missing.");
    }

    if (!thumbnail) {
        throw new ApiError(400, "Thumbnail image is missing.");
    }

    const videoPublished = await Video.create({
        title,
        description,
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        duration: 10    // temporary static data
    });

    if (!videoPublished) {
        throw new ApiError(500, "Something went wrong while publishing the video.");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, videoPublished, "Video has been published successfully.")
        );
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id

    if (!videoId) {
        throw new ApiError(400, "Video ID is not provided in params.");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Please provide valid Video ID.");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "Video fetched successfully using video ID")
        );
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    const { title, description } = req.body;

    if (!videoId) {
        throw new ApiError(400, "Video ID is not provided in params.");
    }

    if (!title || !description) {
        throw new ApiError(400, "All Fields are Required.");
    }

    const thumbnailLocalPath = req.file?.path;

    if (!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail file not provided.");
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!thumbnail) {
        throw new ApiError(400, "Thumbnail file is required.");
    }

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description,
                thumbnail: thumbnail.url
            }
        },
        { new: true }
    );

    return res
        .status(201)
        .json(
            new ApiResponse(201, video, "Video details updated successfully.")
        );
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