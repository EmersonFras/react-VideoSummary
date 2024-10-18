import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const videosAdapter = createEntityAdapter({})

const initialState = videosAdapter.getInitialState()

export const videosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVideos: builder.query({
            query: (userId) => `/videos?userId=${userId}`,
            keepUnusedDataFor: 600, // Cache for 10 minutes
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                if (!Array.isArray(responseData)) {
                    console.error("Expected an array, got:", responseData);
                    return initialState; // Or handle it as you see fit
                }
                const loadedVideos = responseData.map(video => {
                    video.id = video._id;
                    return video;
                })
                return videosAdapter.setAll(initialState, loadedVideos)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Video', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Video', id }))
                    ]
                } else return [{ type: 'Video', id: 'LIST' }]
            }
        }),
        addNewVideo: builder.mutation({
            query: initialVideoData => ({
                url: '/videos',
                method: 'POST',
                body: {
                    ...initialVideoData,
                },
                invalidatesTags: [
                    { type: 'Video', id: 'LIST' }
                ]
            })
        }),
        updateVideo: builder.mutation({
            query: initialVideoData => ({
                url: `/videos`,
                method: 'PATCH',
                body: {
                    ...initialVideoData,
                },
                invalidatesTags: (result, error, arg) => [{ type: 'Video', id: arg.id }]
            }),
        }),
        deleteVideo: builder.mutation({
            query: ({ id }) => ({
                url: '/videos',
                method: 'DELETE',
                body: {
                    id
                },
                invalidatesTags: (result, error, arg) => [{ type: 'Video', id: arg.id }]
            }),
        }),
    })
})

export const {
    useGetVideosQuery,
    useAddNewVideoMutation,
    useUpdateVideoMutation,
    useDeleteVideoMutation,
} = videosApiSlice

// export const selectVideosResult = videosApiSlice.endpoints.getVideos.select()

// const selectVideosData = createSelector(
//     selectVideosResult,
//     videosResult => videosResult.data
// )

// export const {
//     selectAll: selectAllVideos,
//     selectById: selectVideoById

// } = videosAdapter.getSelectors(state => selectVideosData(state) ?? initialState)

// This creates a base selector to access video data based on userId.
const selectVideosResult = (state, userId) => 
    state.api.queries[`getVideos("${userId}")`] ?? initialState;

// Selector to get video data.
const selectVideosData = createSelector(
    (state, userId) => selectVideosResult(state, userId),
    videosResult => videosResult.data
);

// Create selectors for all videos and by id based on userId.
export const selectAllVideos = (userId) => 
    createSelector(
        state => selectVideosData(state, userId) ?? initialState,
        videos => videosAdapter.getSelectors().selectAll(videos)
    );

export const selectVideoById = (userId) => 
    createSelector(
        (state) => selectVideosData(state, userId),
        (videosData) => (videoId) => videosData?.entities ? videosData.entities[videoId] || null : null
    );