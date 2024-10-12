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
            keepUnusedDataFor: 5, // for development default is 60
            transformResponse: responseData => {
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
        })
    })
})

export const {
    useGetVideosQuery,
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