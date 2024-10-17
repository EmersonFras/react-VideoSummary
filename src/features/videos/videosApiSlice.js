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
                });
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

export const selectVideosResult = videosApiSlice.endpoints.getVideos.select()

const selectVideosData = createSelector(
    selectVideosResult,
    videosResult => videosResult.data
)

export const {
    selectAll: selectAllVideos,
    selectIds: selectVideoIds

} = videosAdapter.getSelectors(state => selectVideosData(state) ?? initialState)

export const selectVideoById = (state, videoId) => {
    const videosData = state.api.queries[`getVideos("66f4b8ff0ee2af52bed1aabf")`]?.data;
    return videosData?.entities[videoId]; // Access entities to get the specific video
};