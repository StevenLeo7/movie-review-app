<template>
    <div class="movie-detail">
        <button @click="$router.push('/')">← Back</button>

        <p v-if="loading">Loading...</p>
        <p v-else-if="errorMsg" class="error">{{ errorMsg }}</p>

        <div v-else-if="movie">
            <h1>{{ movie.Title }} ({{ movie.Year }})</h1>
            <img :src="movie.Poster !== 'N/A' ? movie.Poster : ''" alt="" />
            <p>{{ movie.Plot }}</p>
            <p><strong>Genre:</strong> {{ movie.Genre }}</p>
            <p><strong>Director:</strong> {{ movie.Director }}</p>
            <p><strong>IMDb Rating:</strong> {{ movie.imdbRating }}</p>

            <div class="my-score">
                <h3>My Score: {{ myScore ?? 'Not rated' }}</h3>
                <select v-model="selectedScore">
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
                <button @click="saveScore">Save Score</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import api from '../api';

    const route = useRoute();
    const movie = ref(null);
    const myScore = ref(null);
    const selectedScore = ref(5);
    const loading = ref(true);
    const errorMsg = ref('');

    async function loadMovie() {
        loading.value = true;
        errorMsg.value = '';

        try {
            const res = await api.get(`/movies/${route.params.id}`);
            movie.value = res.data;

            const scoreRes = await api.get(`/scores/${route.params.id}`);
            myScore.value = scoreRes.data.score;
        
            if (myScore.value) selectedScore.value = myScore.value;
        } catch (err) {
            errorMsg.value = 'Failed to load movie details.';
        } finally {
            loading.value = false;
        }
    }

    async function saveScore() {
        try {
            await api.post(`/scores/${route.params.id}`, { score: selectedScore.value });
            myScore.value = selectedScore.value;
        } catch (err) {
            alert('Failed to save score');
        }
    }

    onMounted(loadMovie);
    
</script>

<style scoped>

    .movie-detail { 
        max-width: 600px; 
        margin: 40px auto; 
    }

    img { 
        max-width: 200px; 
    }

    .error { 
        color: red; 
    }

</style>