import * as TabsPrimitive from '@radix-ui/react-tabs';
import styled from 'styled-components';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useState } from 'react';
import { concatAST } from 'graphql';
import { ReactComponent as Edit } from '@assets/icons/pencil.svg';
import { EditButton } from 'components/EditButton';

const StyledTabs = styled(TabsPrimitive.Root)`
    display: flex;
    flex-direction: column;
    width: 300;
  `,
  StyledTabList = styled(TabsPrimitive.List)`
    display: flex;
    flex-shrink: 0;
    background-color: #f3f4f6;
    border-radius: 20px;
  `,
  StyledTrigger = styled(TabsPrimitive.Trigger)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0 10px;
    height: 24px;
    border: none;
    border-radius: 20px;
    color: #9ca3af;
    font-size: 18px;
    font-weight: 300;
    cursor: pointer;
    user-select: none;
    transition: all 100ms ease;
    background-color: #f3f4f6;
    &:hover {
      background-color: #d0d0d0;
    }
    &[data-state='active'] {
      background-color: #374151;
      color: white;
    }
  `,
  StyledContent = styled(TabsPrimitive.Content)`
    padding: 0 10px;
    flex-grow: 1;
    padding-top: 10px;
    background-color: white;
    color: #374151;
    border-radius: 20px;
    font-weight: 500;
  `,
  StyledLabel = styled(LabelPrimitive.Root)`
    font-size: 12px;
    margin: 3px;
    font-weight: 400;
    color: #374151;
    font-family: 'IBM Plex Sans';
    color: #d1d5db;
  `;

//exports

export const Tabs = StyledTabs;
export const TabList = StyledTabList;
export const TabTrigger = StyledTrigger;
export const TabContent = StyledContent;
export const Label = StyledLabel;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
const Flex = styled.div`
  display: flex;
`;
export const H1 = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #374151;
  margin: 10;
`;
const H2 = styled.h2`
  font-size: 15px;
  font-weight: 500;
  color: #374151;
  margin: 10;
  font-family: 'IBM Plex Sans';
`;
const H3 = styled.h3`
  font-size: 12px;
  margin: 3px;
  font-weight: 400;
  color: #374151;
  font-family: 'IBM Plex Sans';
  color: #d1d5db;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #374151;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  padding: 8px;

  color: white;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
`;

const LabelWrapper = styled.div`
  width: 40%;
`;

const PsetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const PropValue = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #374151;
`;

export function BuildingElementData() {
  const buildingElementData = {
    id: '123',
    propertiesGroups: [
      {
        name: 'Overview',
        id: 'overview',
        subGroups: [
          {
            name: 'Identity',
            id: 'identity',
            type: 'proprtySet',
            display: 'list',
            props: [
              { name: 'Element ID', id: 'elementId', value: '5765AVQY' },
              { name: 'Building ID', id: 'buildingId', value: '5765AVQY' },
              { name: 'Name', id: 'name', value: 'Window', editable: true },
              {
                name: 'Description',
                id: 'description',
                value: '',
                editable: true,
              },
              {
                name: 'Manufacturer',
                id: 'manufacturer',
                value: '',
                editable: true,
              },
              {
                name: 'Date of manufacture',
                id: 'manufactureDate',
                value: '',
                editable: true,
              },
            ],
          },
          {
            name: 'Location',
            id: 'location',
            type: 'proprtySet',
            display: 'list',
            props: [
              { name: 'Floor', id: 'floor', value: '1' },
              { name: 'Zone', id: 'zone', value: 'Zone' },
              { name: 'Room', id: 'room', value: '1' },
            ],
          },
          {
            name: 'Physical properties',
            id: 'physicalProperties',
            type: 'proprtySet',
            display: 'list',
            props: [
              { name: 'Height', id: 'height', value: '1200', unit: 'mm' },
              { name: 'Width', id: 'width', value: '800', unit: 'mm' },
              { name: 'Depth', id: 'depth', value: '100', unit: 'mm' },
              {
                name: 'Mass',
                id: 'mass',
                value: '10',
                unit: 'kg',
                editable: true,
              },
            ],
          },
          {
            name: 'Materials',
            id: 'materials',
            type: 'materialList',
            display: 'cards',
            props: [
              {
                name: 'Material A',
                id: 'materiala',
                props: [{ name: 'mass', value: '12.6', units: 'kg' }],
              },
              {
                name: 'Material B',
                id: 'materialb',
                props: [{ name: 'mass', value: '8.1', units: 'kg' }],
              },
              {
                name: 'Material C',
                id: 'materialc',
                props: [{ name: 'mass', value: '1.8', units: 'kg' }],
              },
              {
                name: 'Material D',
                id: 'materiald',
                props: [{ name: 'mass', value: '1.3', units: 'kg' }],
              },
            ],
          },
        ],
      },
      {
        name: 'Impact',
        id: 'impact',
        subGroups: [
          {
            name: 'Environmental Impact',
            id: 'envImpact',
            type: 'proprtySet',
            display: 'table',
            props: [
              {
                category: 'Climate change - Total',
                scope: 'A1-A3',
                unit: 'kg CO2-eq',
                value: '0.000',
                source: 'EPD',
              },
              {
                category: 'Climate change - Fossil',
                scope: 'Full',
                unit: 'kg CO2-eq',
                value: '0.000',
                source: 'EPD',
              },
              {
                category: 'Climate change - Biogenic',
                scope: 'Full',
                unit: 'kg CO2-eq',
                value: '0.000',
                source: 'EPD',
              },
              {
                category: 'Climate change - LULUC',
                scope: 'Full',
                unit: 'kg CO2-eq',
                value: '0.000',
                source: 'EPD',
              },
            ],
          },
          {
            name: 'Data sources',
            id: 'dataSources',
            type: 'proprtySet',
            display: 'list',
            props: [
              { name: 'Source', id: 'source', value: 'EPD' },
              { name: 'Format', id: 'format', value: 'EN 15804+A2' },
              { name: 'Version', id: 'version', value: '1.0' },
              { name: 'Date', id: 'date', value: '2020-01-01' },
              {
                name: 'Link',
                id: 'location',
                value:
                  'https://data.environdec.com/resource/processes/27d29e96-6544-44d6-90e4-755384184bf6?format',
              },
            ],
          },
        ],
      },
      {
        name: 'Performance',
        id: 'performance',
        subGroups: [
          {
            name: 'Structural',
            id: 'structural',
            props: [
              {
                name: 'Tensile strength',
                id: 'tensileStrength',
                value: '1000',
              },
              {
                name: 'Compressive strength',
                id: 'compressiveStrength',
                value: '1000',
              },
              {
                name: 'Load bearing capacity',
                id: 'loadBearingCapacity',
                value: '1000',
              },
              { name: 'Resistance', id: 'resistance', value: '1000' },
              { name: 'Stability', id: 'stability', value: '1000' },
            ],
          },
        ],
      },
    ],
  };
  return (
    <Box>
      <H1>Building element data</H1>
      <Tabs defaultValue="overview">
        <TabList>
          {buildingElementData.propertiesGroups.map((group) => (
            <TabTrigger key={group.id} value={group.id}>
              {group.name}
            </TabTrigger>
          ))}
        </TabList>
        {buildingElementData.propertiesGroups.map((group) => (
          <TabContent key={group.id} value={group.id}>
            {group.subGroups.map((prop) => (
              <PropertiesGroup key={prop.id} {...prop} />
            ))}
          </TabContent>
        ))}
      </Tabs>
    </Box>
  );
}

function PropertiesGroup(props: any) {
  const { name, type, props: properties, display } = props;
  //return based on Display type
  switch (display) {
    case 'list':
      return <PropertiesList {...props} />;
    case 'cards':
      return <PropertiesCards {...props} />;
    default:
      return <></>;
  }
}

function PropertiesList(props: any) {
  const [edit, setEdit] = useState(false);
  const { groups } = props;
  return (
    <Box>
      <PsetWrapper>
        <H2>{props.name}</H2>
        <EditButton onClick={() => setEdit(!edit)} active={edit} />
      </PsetWrapper>
      <Box>
        {props.props &&
          props.props.map((prop: any) => (
            <Box key={prop.id}>
              <Propetry {...prop} edit={edit} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}

function PropertiesTable(props: any) {
  const { groups } = props;
  return <Box></Box>;
}

function PropertiesCards(props: any) {
  const { groups } = props;
  return (
    <Box>
      <Box>
        <H2>{props.name}</H2>
      </Box>
      <Grid>
        {props.props &&
          props.props.map((prop: any) => (
            <Card>
              <H3>{prop.name}</H3>
            </Card>
          ))}
      </Grid>
    </Box>
  );
}

type ParameterProps = {
  id: string;
  name: string;
  value: string;
  unit?: string;
  editable?: boolean;
  edit?: boolean;
};

function Propetry(props: ParameterProps) {
  const { name, id, value: pvalue, unit, edit, editable } = props;
  const [value, setValue] = useState(pvalue);
  return (
    <Flex>
      <LabelWrapper>
        <Label htmlFor={id}>
          {unit ? ' '.concat(name, ` (${unit})`) : name}
        </Label>
      </LabelWrapper>
      {edit && editable ? (
        <PropValue>
          <input
            id={id}
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </PropValue>
      ) : (
        <PropValue>{value}</PropValue>
      )}
    </Flex>
  );
}
