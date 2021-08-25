<template>
    <div class="container">
        <h3>{{ title }}</h3>
        <div 
            :class="['card', 
                {'drawable': drawable}, 
                {'face-down': !visible}, 
                {'highlighed': highlighed}
            ]"
            @click="draw"    
        >
            <div>{{ label }}</div>
        </div>
        <caption v-if="visible && cards.length" @click="detailsOpen = true">
            Details
        </caption>
        <div v-if="detailsOpen" @click="detailsOpen = false" class="details">{{ details }}</div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            detailsOpen: false
        }
    },
    props: {
        title: String,
        cards: Array,
        visible: Boolean,
        drawable: Boolean,
        highlighed: Boolean,
    },
    methods: {
        draw: function() {
            if (this.drawable) {
                this.$emit('drawn');
            }
        }
    },
    computed: {
        label: function() {
            if (this.visible) {
                if (this.cards.length == 0) {
                    return '';
                }
                return this.cards[this.cards.length - 1].name;
            }
            return this.cards.length
        },
        details: function() {
            if (this.cards.length == 0) {
                return '';
            }
            return this.cards[this.cards.length - 1].description;
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    margin: 8px;
}

.card {
    height: 80px;
    width: 60px;
    border: 2px solid black;
    margin: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
}

.drawable {
    cursor: pointer;
}

.face-down {
    background-color: black;
    color: white;
}

.highlighed {
    background-color: green;
}

caption {
    cursor: pointer;
    color: darkcyan;
}

.details {
    background-color: lightblue;
    position: fixed;
    top: 0;
    left: 0;
    padding: 8px;
}
</style>