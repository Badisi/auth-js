<template>
    <demo-app-main
        :isRenewing="$authService.isRenewingRef.value"
        :isAuthenticated="$authService.isAuthenticatedRef.value"
        @login="$authService.login()"
        @logout="$authService.logout({ redirectUrl: '/' })"
        @silentRenew="$authService.renew()">
        <!-- playground -->
        <demo-app-playground
            ref="demoAppPlayground"
            tabLabel="Playground"
            @api="callPrivateApi($event)"
            @home="navigate('/', $event)"
            @public="navigate('public', $event)"
            @private="navigate('private', $event)"
            @protected="navigate('protected', $event)">
            <RouterView />
        </demo-app-playground>

        <!-- debug -->
        <demo-app-debug
            tabLabel="Debug"
            :isAuthenticated="$authService.isAuthenticatedRef.value"
            :userProfile="$authService.userProfileRef.value"
            :userSession="$authService.userSessionRef.value"
            :idToken="$authService.idTokenRef.value"
            :idTokenDecoded="$authService.idTokenDecodedRef.value"
            :accessToken="$authService.accessTokenRef.value"
            :accessTokenDecoded="$authService.accessTokenDecodedRef.value"></demo-app-debug>

        <!-- settings -->
        <demo-app-settings tabLabel="Settings"></demo-app-settings>
    </demo-app-main>
</template>

<script setup lang="ts">
import { DemoAppPlaygroundElement } from 'demo-app-common';
import { LocationQueryRaw, useRouter } from 'vue-router';
import { useTemplateRef } from 'vue';
import axios from 'axios';

const demoAppPlaygroundEl = useTemplateRef<DemoAppPlaygroundElement>('demoAppPlayground');
const router = useRouter();

const callPrivateApi = async (event: Event): Promise<void> => {
    const { url, headers } = (event as CustomEvent).detail as {
        url: string;
        headers?: Record<string, string | number>;
    };

    if (url) {
        await axios
            .get(url, { headers })
            .then(response => demoAppPlaygroundEl.value?.setApiStatus(response.data, false))
            .catch(error => demoAppPlaygroundEl.value?.setApiStatus(error, true));
    }
};

const navigate = async (url: string, event: Event): Promise<void> => {
    const { queryParams } = (event as CustomEvent).detail as {
        queryParams?: LocationQueryRaw;
    };
    await router.push({ path: url, query: queryParams, force: true });
};
</script>
