import App from '../../src/components/App';
import { createRoot } from 'react-dom/client';
import { it } from 'vitest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<App />);
  root.unmount();
});
