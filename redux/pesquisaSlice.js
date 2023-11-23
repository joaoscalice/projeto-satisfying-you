import {createSlice} from '@reduxjs/toolkit';

const initialValues = {
  nome: null,
  imageUrl: null,
  data: null,
  id: null,
  avaliacoes: {
    pessimo: 0,
    ruim: 0,
    neutro: 0,
    bom: 0,
    excelente: 0,
  },
};

export const pesquisaSlice = createSlice({
  name: 'pesquisa',
  initialState: initialValues,
  reducers: {
    reducerSetPesquisa: (state, action) => {
      state.nome = action.payload.nome;
      state.imageUrl = action.payload.imageUrl;
      state.data = action.payload.data;
      state.id = action.payload.id;
      state.avaliacoes = action.payload.avaliacoes;
    },
    reducerIncrementaAvaliacao: (state, action) => {
      const {type} = action.payload;
      state.avaliacoes[type] += 1;
    },
    reducerLimpaPesquisa: state => {
      Object.assign(state, {...initialValues});
    },
  },
});

export const {
  reducerSetPesquisa,
  reducerIncrementaAvaliacao,
  reducerLimpaPesquisa,
} = pesquisaSlice.actions;

export default pesquisaSlice.reducer;
