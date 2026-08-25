<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin">
            <input v-model="username" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import api from '../api';

    const username = ref('');
    const password = ref('');
    const error = ref('');
    const loading = ref(false);
    const router = useRouter();

    async function handleLogin() {
        error.value = '';
        loading.value = true;
        try {
            const res = await api.post('/auth/login', {
                username: username.value,
                password: password.value,
            });
            localStorage.setItem('token', res.data.token);
            router.push('/');
        } catch (err) {
            error.value = err.response?.data?.error || 'Login failed';
        } finally {
            loading.value = false;
        }
    }
</script>

<style scoped>

    .login { 
        max-width: 320px; 
        margin: 80px auto; 
        text-align: center; 
    }

    input { 
        display: block; 
        width: 100%; 
        margin: 8px 0; 
        padding: 8px; 
    }

    button { 
        padding: 8px 16px; 
    }

    .error { 
        color: red; 
    }

</style>