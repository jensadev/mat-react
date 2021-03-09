import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

function Date(props) {
  const date = parseISO(props.dateString);
  return (
    <time className={props.classes} dateTime={props.dateString}>
      {format(date, 'PPPP', { locale: sv })}
    </time>
  );
}
export default Date;
