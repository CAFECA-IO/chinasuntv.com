import asyncComponent from '../utils/asyncComponent';

export const Index = asyncComponent('Index', () => import('../containers/index/index'));
