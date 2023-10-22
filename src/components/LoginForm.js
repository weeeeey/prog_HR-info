import { handleSignUp } from '../utility/localStorage.js';

export default function LoginForm($app) {
    this.state = {
        name: '',
        email: '',
        role: '',
        MBTI: '',
    };

    this.$target = document.createElement('form');
    this.$target.id = 'form_container';

    $app.appendChild(this.$target);

    this.render = () => {
        const nameRegex = '[가-힣]{2,4}$';
        const emailRegex = '[a-zA-Z0-9]+@grepp.co$';
        const nicknameRegex = '[a-zA-Z]{3,10}$';

        this.$target.innerHTML = `
            <span class="form_elem">
                <input id="name" placeholder="이름" pattern=${nameRegex} required/>
            </span>
            <span class="form_elem">
                <input id="email" placeholder="이메일" pattern=${emailRegex}  required/>
            </span>
            <span class="form_elem">
                <input id="nickname" placeholder="닉네임" pattern=${nicknameRegex} required/>
            </span>

            <span class="form_elem">
                <select id="role" name="role" required>
                    <option value="">직군을 선택해주세요</option>
                    <option value="backend">백엔드</option>
                    <option value="frontend">프론트엔드</option>
                    <option value="fullstack">풀스택</option>
                </select>
            </span>
            <span class="form_elem">
                <select id="mbti" name="mbti">
                    <option value="">MBTI를 선택해주세요</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENTJ">ENTJ</option>
                    <option value="ENFP">ENFP</option>
                    <option value="ENTP">ENTP</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESFP">ESFP</option>
                    <option value="ESTP">ESTP</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INTJ">INTJ</option>
                    <option value="INFP">INFP</option>
                    <option value="INTP">INTP</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISFP">ISFP</option>
                    <option value="ISTP">ISTP</option>
                </select>
            </span>
            <span class="form_elem">
                <button type="submit">등록</button>
            </span>
        `;
        const spanNodes = document.querySelectorAll('.form_elem');
        spanNodes.forEach((spanNode) => {
            const title = document.createElement('span');
            title.className = 'mark';

            switch (spanNode.children[0].id) {
                case 'name':
                    title.innerText = `이름`;
                    spanNode.children[0].setAttribute(
                        'title',
                        '2~4 글자의 한글만 입력이 가능합니다.'
                    );
                    break;
                case 'email':
                    title.innerText = `이메일`;
                    spanNode.children[0].setAttribute(
                        'title',
                        '이메일은 영문과 숫자만 입력 가능하며 @grepp.co 형식의 이메일을 사용해야 합니다.'
                    );
                    break;
                case 'nickname':
                    title.innerText = `닉네임`;
                    spanNode.children[0].setAttribute(
                        'title',
                        '대소문자 구분 없이 3~10글자의 영문으로 작성해야 합니다.'
                    );
                    break;
                case 'role':
                    title.innerText = `직군`;

                    break;
                case 'mbti':
                    title.innerText = `MBTI`;
                    break;
            }
            const sub = document.createElement('span');
            const reqiureText = spanNode.children[0].attributes.required
                ? '(필수*)'
                : '';
            sub.innerText = reqiureText;
            sub.style.color = 'red';

            title.appendChild(sub);

            spanNode.prepend(title);
            spanNode.style.display = 'flex';
            spanNode.style.flexDirection = 'column';
            spanNode.style.alignItems = 'flex-start';
        });
    };
    this.render();

    this.$target.addEventListener('submit', (e) => {
        e.preventDefault();

        const nickname = document.querySelector('#nickname').value;
        const email = document.querySelector('#email').value;
        const isSign = handleSignUp({
            email,
            nickname,
        });
        if (isSign) {
            const inputs = document.querySelectorAll('input');
            inputs.forEach((input) => {
                input.value = '';
            });
            const selects = document.querySelectorAll('select');
            selects.forEach((select) => {
                select.value = '';
            });
        }
    });

    this.createRequireTitle = () => {};
}
