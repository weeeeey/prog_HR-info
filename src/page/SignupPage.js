import ContentTitle from '../components/ContentTitle.js';
import LoginForm from '../components/LoginForm.js';
export default function SignupPage($app) {
    new ContentTitle({
        $app,
        initialState: window.location.pathname,
    });
    new LoginForm($app);
}
