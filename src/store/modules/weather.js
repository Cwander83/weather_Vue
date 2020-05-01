import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather?';

const state = {
	weather: [],
	errMsg: false,
};

const getters = {
	getWeather: (state) => state.weather,
	getError: (state) => state.errMsg,
};

const actions = {
	async fetchWeatherCoords({ commit }, coords) {
		try {
			commit('setError', false);
			const response = await axios.get(
				`${URL}lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.VUE_APP_WEATHER_KEY}&units=imperial`
			);
			commit('setWeather', response.data);
		} catch (err) {
			commit('setError', true);
		}
	},
	async fetchWeather({ commit }, place) {
		try {
			commit('setError', false);
			commit('setWeather', []);
			const response = await axios.get(
				`${URL}q=${place}&appid=${process.env.VUE_APP_WEATHER_KEY}&units=imperial`
			);
			if (response) commit('setWeather', response.data);
		} catch (err) {
			commit('setError', true);
		}
	},
};

const mutations = {
	setWeather: (state, weather) => (state.weather = weather),
	setError: (state, errMsg) => (state.errMsg = errMsg),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
