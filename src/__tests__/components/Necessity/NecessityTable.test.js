import React from 'react';
import * as ReactAll from 'react';
import sinon from 'sinon';
import { expect } from 'chai'
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import * as user from '../../../store/selectors/user'
import Necessity from '../../../pages/Necessity.js';
import NecessityTable from '../../../components/Necessity/NecessityTable.js';


configure({ adapter: new Adapter() });

describe('Necessity', function() {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    const dispatch = sinon.stub()
    jest.spyOn(ReactAll, 'useContext').mockImplementation(() => { return { state: '', dispatch: dispatch } })
    jest.spyOn(user, 'selectUserState').mockImplementation((state) => { return { user: {}, isLogged: true } })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the NecessityTable wrapper', () => {
    const config = {
      appId:'kintun.wingu.org',
      appLogo:  '/mapping-platform-logo.svg',
      favicon: '',
      colors: {
        appBackgroundColor: {
          backgroundColor: '#f3f3f3'
        },
        navBarOptions: {
          activeColor: '#f3f3f3',
          backgroundColor: '#343a40',
          inactiveColor: '#808080'
        },
        panelBackgroundColor: {
          backgroundColor: '#343a40'
        },
        buttonColor: {
          backgroundColor: '#343a40',
          textColor: '#f3f3f3'
        },
        primaryText: {
          color: '#343a40'
        },
        secondaryText: {
          color: '#04d38b'
        }
      },
      name: 'kintun',
    }
    
    const configStr = JSON.stringify(config)
    Storage.prototype.getItem = jest.fn(() => {
      return configStr
    });


    const wrapper = shallow(<Necessity />);
    expect(wrapper.find(NecessityTable)).to.have.length(1);
  });

  it('renders the NecessityTable wrapper and validates that are no necessities to render', () => {
    const showNecessityIntoMap = jest.fn();

    const necessityTable = shallow(<NecessityTable data={[]} showNecessityIntoMap={showNecessityIntoMap} />);

    const divTable = necessityTable.find('div.necessities__table');

    const table = divTable.find('span');
    expect(table.length).to.eql(1);

    const tableElements = table.find('h5').map(h5 => h5.text());

    expect(tableElements.length).greaterThan(1);
    expect(tableElements[0]).to.eql('No hay mapeos cargados');
    expect(tableElements[1]).to.eql("Hacer click en 'Nuevo Mapeo' para crear uno");
  });
});
