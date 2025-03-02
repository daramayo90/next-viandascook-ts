import { Accordion } from '.';
import { questions } from '../../utils';

export const Questions = () => {
   return (
      <div style={{ width: '100%' }}>
         {questions.map(({ title, content }) => (
            <Accordion key={title} title={title} content={content} />
         ))}
      </div>
   );
};
