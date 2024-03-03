import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import moment from 'moment'
import { useDispatch } from 'react-redux'

export type TypeCharacters = {
  actor: string
  alive: boolean
  alternate_actors: []
  alternate_names: string[]
  ancestry: string
  dateOfBirth: string
  eyeColour: string
  gender: string
  hairColour: string
  hogwartsStaff: boolean
  hogwartsStudent: boolean
  house: string
  id: string
  image: string
  name: string
  patronus: string
  species: string
  wand: {
    core: string
    length: number
    wood: string
  }
  wizard: boolean
  yearOfBirth: number
}

export interface CounterState {
  characters: any[]
  sortCharacters: any[]
  allАaculties: string[]
  dataStart: string
  dataEnd: string
}

const initialState: CounterState = {
  characters: [],
  sortCharacters: [],
  allАaculties: [''],
  dataStart: '',
  dataEnd: '',
}

export const getCharacters = createAsyncThunk(
  'characters/get',
  async ({ dataStart, dataEnd }: any) => {
    const result = await axios.get('https://hp-api.onrender.com/api/characters')
    const acters = result.data as TypeCharacters[]
    const filterActers = acters.filter((item) => {
      if (!item.dateOfBirth) return false
      const startData = moment(item.dateOfBirth.split('-').reverse().join('-'))
      const endData = moment(item.dateOfBirth.split('-').reverse().join('-'))
      if (
        startData.isSameOrAfter(dataStart) &&
        endData.isSameOrBefore(dataEnd)
      ) {
        return true
      }
      return false
    })
    return filterActers
  }
)

export const gariPoter = createSlice({
  name: 'charactersReducer',
  initialState,
  reducers: {
    addDataStart: (state, action) => {
      state.dataStart = action.payload
    },
    addDataEnd: (state, action) => {
      state.dataEnd = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacters.pending, (state) => {
      state.characters = []
    })
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      const payload = action.payload as any[]
      state.characters = payload

      state.sortCharacters = payload.reduce((acc, item) => {
        if (acc[item.house]) {
          acc[item.house].push(item)
        } else if (item.house !== '') {
          acc[item.house] = [item]
        }
        return acc
      }, {})
    })
    builder.addCase(getCharacters.rejected, (state) => {
      state.characters = []
    })
  },
})

export const { addDataStart, addDataEnd } = gariPoter.actions

export default gariPoter.reducer
