export default function Header({ $app, initialState, onClick }) {
    this.state = initialState;
    this.$target = document.createElement('header');

    $app.appendChild(this.$target);

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = () => {
        this.$target.innerHTML = `
            <div class="header header_left">
                <span class="menu_name" id="menu_home">HOME</span>
            </div>
            <div class="header header_right">
                <span class="menu_name" id="menu_signup">SIGNUP</span>
            </div>
        `;
    };
    this.render();
    this.$target.addEventListener('click', (e) => {
        const menu = e.target.closest('.menu_name');
        if (!menu) {
            return;
        }
        const url = menu.id === 'menu_home' ? '/web' : '/web/signup';
        onClick(url);
    });
}
