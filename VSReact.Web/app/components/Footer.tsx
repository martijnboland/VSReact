import * as React from 'react';
import { observer } from 'mobx-react';
import * as classnames from 'classnames';
import { TodoFilter } from '../store/AppState';

const FILTER_TITLES = {
  [TodoFilter.All]: 'All',
  [TodoFilter.Active]: 'Active',
  [TodoFilter.Completed]: 'Completed'
};

interface IFooterProps {
  markedCount: number,
  unmarkedCount: number,
  filter: TodoFilter,
  onClearMarked(): void,
  onShow(filter: TodoFilter): void
}

@observer
export default class Footer extends React.Component<IFooterProps, {}> {

  render() {
    const filters: TodoFilter[] = Object.keys(TodoFilter)
      .filter(key => !isNaN(Number(TodoFilter[key])))
      .map(key => TodoFilter[key]);
    return (
      <footer className='footer'>
        {this.renderTodoCount()}
        <ul className='filters'>
          {filters.map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }

  renderTodoCount() {
    const { unmarkedCount } = this.props;
    const itemWord = unmarkedCount === 1 ? 'item' : 'items';

    return (
      <span className='todo-count'>
        <strong>{unmarkedCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoFilter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <a className={classnames({ selected: filter === selectedFilter })}
         style={{ cursor: 'hand' }}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { markedCount, onClearMarked } = this.props;
    if (markedCount > 0) {
      return (
        <button className='clear-completed'
                onClick={onClearMarked} >
          Clear completed
        </button>
      );
    }
  }
}
