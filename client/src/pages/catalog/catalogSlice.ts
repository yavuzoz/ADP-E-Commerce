import { IProduct } from '@/model/IProduct';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import requests from "../../../api/requests";
import { RootState } from '../../store/store'; 


//Async thunk to fetch all products
export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts",
    async () => {
        return await requests.Catalog.list();
    }
);

//Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk<IProduct, number>(
    "catalog/fetchProductById",  //  fix typo in the type name
    async (productId) => {
        return await requests.Catalog.details(productId);
    }
);

//  Create entity adapter for normalized state
const productsAdapter = createEntityAdapter<IProduct>();

const initialState = productsAdapter.getInitialState({
    status: "idle",
    isLoaded: false,
});

//  Catalog slice
export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload); //  state is always first param
            state.isLoaded = true;
            state.status = "idle";
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(fetchProductById.pending, (state) => {
            state.status = "pendingFetchProductById";
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload); // fix typo: upsertOne not upserOne
            state.status = "idle";
        });
        builder.addCase(fetchProductById.rejected, (state) => {
            state.status = "idle";
        });
    }
});

export const {
    selectById: selectProductById,
    selectIds: selectProductIds,
    selectEntities: selectProductEntities,
    selectAll: selectAllProducts,
    selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: RootState) => state.catalog);

