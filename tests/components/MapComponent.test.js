import React from 'react'
import { mount } from 'enzyme'
import MapComponent from '../../src/components/MapComponent';
import api from '../../src/api'
import * as necessites from '../data/necessities.json'
 
describe('Hospitals', () => {
 
    it('when clicking on show hospitals button, the PublicMap renders the markers', () => {
        const mapComponent = mount(<MapComponent data={null} />)
        const mapNode = mapComponent.find('#mapid')

        jest.spyOn(api, 'getHospitals').mockImplementation(() => {
            return necessites;
        })
      
        expect(buttonNode.length).toEqual(1);
        expect(mapNode.length).toEqual(1);
        expect(mapComponent.containsMatchingElement(mapNode))

        buttonNode.simulate('click');

        expect(mapComponent.find('#mapid').find('.leaflet-marker-pane').some('img')).to.equal(true)
    });
})