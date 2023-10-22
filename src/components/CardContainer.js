import {
    getCardStatusData,
    getHRdata,
    setCardStatusData,
} from '../utility/localStorage.js';
import CardInfo from './CardInfo.js';

export default function CardContainer({ $app }) {
    this.state = {
        personalInfos: getHRdata(),
    };

    this.$target = document.createElement('div');
    this.$target.id = 'cards_container';

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        const cardsDiv = document.querySelectorAll('.card');
        if (cardsDiv.length) {
            cardsDiv.forEach((card) => {
                this.$target.removeChild(card);
            });
        }
        this.state.personalInfos.forEach((info, idx) => {
            new CardInfo({
                $app: this.$target,
                initialState: { ...info, idx },
                infinityScroll: (idx) => {
                    if (idx === this.state.personalInfos.length - 1) {
                        const card = document.getElementById(idx);
                        const ob = new IntersectionObserver(
                            (item) => {
                                if (item[0].isIntersecting) {
                                    this.setState({
                                        ...this.state,
                                        personalInfos: [
                                            ...this.state.personalInfos,
                                            ...getHRdata(),
                                        ],
                                    });
                                }
                            },
                            {
                                threshold: 1,
                            }
                        );
                        ob.observe(card);
                    }
                },
                onClick: (idx) => {
                    setCardStatusData(idx % 10);
                    this.setState({
                        ...this.state,
                    });
                },
            });
        });
    };

    this.render();
}
