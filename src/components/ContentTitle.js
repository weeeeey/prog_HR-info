export default function ContentTitle({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'content_title';
    $app.appendChild(this.$target);

    this.render = () => {
        const text =
            this.state === '/web' ? 'Great People' : 'Sign up, Great people!';
        this.$target.innerHTML = `
            <h1>${text}</h1>
        `;
    };
    this.render();
}
