<template>
    <div class="movie-list">
        <h1>Movie Search</h1>
        <input v-model="query" @keyup.enter="search(1)" placeholder="Search movies..." />
        <button @click="search(1)">Search</button>

        <p v-if="loading">Loading...</p>
        <p v-else-if="noMatches">No matches found.</p>
        <p v-else-if="errorMsg" class="error">{{ errorMsg }}</p>

        <div v-else class="results">
            <div v-for="movie in results" :key="movie.imdbID" class="card" @click="goDetail(movie.imdbID)">
                <img :src="movie.Poster !== 'N/A' ? movie.Poster : ''" alt="" />
                <p>{{ movie.Title }} ({{ movie.Year }})</p>
            </div>
        </div>

        <div v-if="totalResults > 10" class="pagination">
            <button :disabled="page === 1" @click="search(page - 1)">Prev</button>
            <span>Page {{ page }} / {{ totalPages }}</span>
            <button :disabled="page >= totalPages" @click="search(page + 1)">Next</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import api from '../api';

    const query = ref('');
    const results = ref([]);
    const totalResults = ref(0);
    const page = ref(1);
    const loading = ref(false);
    const noMatches = ref(false);
    const errorMsg = ref('');
    const router = useRouter();

    const totalPages = computed(() => Math.ceil(totalResults.value / 10));

    async function search(p) {
        if (!query.value.trim()) return;
        loading.value = true;
        noMatches.value = false;
        errorMsg.value = '';
        page.value = p;

        try {
            const res = await api.get('/movies/search', { params: { q: query.value, page: p } });
            if (res.data.noMatches) {
                noMatches.value = true;
                results.value = [];
            } else {
                results.value = res.data.results;
                totalResults.value = res.data.totalResults;
            }
        } catch (err) {
            errorMsg.value = 'Failed to fetch results. Please try again.';
        } finally {
            loading.value = false;
        }
    }

    function goDetail(id) {
        router.push(`/movie/${id}`);
    }
</script>

<style scoped>

    .results { 
        display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
        gap: 16px; 
        margin-top: 16px; 
    }

    .card { 
        cursor: pointer; 
        text-align: center; 
    }

    .card img { 
        width: 100%; 
        border-radius: 4px; 
    }

    .pagination { 
        margin-top: 16px; 
        display: flex; 
        gap: 8px; 
        align-items: center; 
    }

    .error { 
        color: red; 
    }
</style>