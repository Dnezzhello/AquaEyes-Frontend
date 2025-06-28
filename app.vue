<!-- app.vue -->
<template>
    <NuxtLayout>
        <NuxtPage />

        <!-- Global Alert Modal -->
        <!-- <AlertModal
            v-if="alertState.state.showAlert"
            :type="alertState.state.type"
            :title="alertState.state.title"
            :message="alertState.state.message"
            @dismiss="alertState.hideAlert"
            @confirm="alertState.hideAlert"
        /> -->
    </NuxtLayout>
</template>

<script setup>
import { useAlertState } from "~/composables/useAlertState";
import AlertModal from "~/components/modals/AlertModal.vue";

const alertState = useAlertState();
</script>
