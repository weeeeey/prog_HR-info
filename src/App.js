import HomePage from './page/HomePage.js';
import Header from './components/Header.js';
import { setHRdata } from './utility/localStorage.js';
import SignupPage from './page/SignupPage.js';

export default function App($app) {
    this.state = {
        location: '/web',
    };

    const header = new Header({
        $app,
        initialState: this.state.location,
        onClick: (url) => {
            // window.history.pushState('', '', url);
            this.setState({
                ...this.state,
                location: url,
            });
        },
    });

    this.setState = (nextState) => {
        this.state = nextState;
        header.setState(this.state.location);
        this.render();
    };

    this.render = async () => {
        const $main = document.querySelector('main');
        if ($main) {
            $app.removeChild($main);
        }

        await setHRdata();
        this.$target = document.createElement('main');
        this.$target.id = 'page_content';

        $app.appendChild(this.$target);

        if (this.state.location === '/web') {
            new SignupPage(this.$target);
        }
    };
    this.render();
}
