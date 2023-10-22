import { getCardStatusData } from '../utility/localStorage.js';

export default function CardInfo({
    $app,
    initialState,
    onClick,
    infinityScroll,
}) {
    this.state = initialState;
    this.$target = document.createElement('div');

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        const { idx, nickname, mbti } = this.state;
        const cards = getCardStatusData();
        this.$target.className = cards[idx % 10].status;
        this.$target.id = idx;

        this.$target.innerHTML = `
            <div class="card_plane card_plane--front">${nickname}</div>
            <div class="card_plane card_plane--back">${mbti}</div>
        `;
        infinityScroll(idx);
    };
    this.$target.addEventListener('click', (e) => {
        const cardDiv = e.target.closest('.card');
        if (!cardDiv) return;
        onClick(cardDiv.id);
        this.render();
    });
    this.render();
}
