import CardContainer from '../components/CardContainer.js';
import ContentTitle from '../components/ContentTitle.js';

export default function HomePage($app) {
    new ContentTitle({
        $app,
        initialState: window.location.pathname,
    });

    new CardContainer({ $app });
}
