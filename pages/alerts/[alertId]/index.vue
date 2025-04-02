<template>
    <div>
        <h1>Alert Details</h1>
        <p>{{ alert.title }}</p>
        <p>{{ alert.description }}</p>
    </div>
</template>

<script>
export default {
    async asyncData({ params }) {
        const alert = await fetch(
            `https://api.example.com/alerts/${params.alertId}`,
        ).then((res) => res.json());
        return { alert };
    },
};
</script>

<style scoped>
h1 {
    color: #333;
}
</style>
