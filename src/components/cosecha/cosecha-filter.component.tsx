import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  VStack,
  Modal,
  Box,
  Button,
  FormControl,
  Select,
  CheckIcon,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
// eslint-disable-next-line no-unused-vars
import { SalaDTO } from '../../models/sala';
import SalaStore from '../../stores/sala.store';
import moment from 'moment';
import CosechaStore from '../../stores/cosecha.store';
import TurnoStore from '../../stores/turno.store';
import UsuarioStore from '../../stores/usuario.store';
// eslint-disable-next-line no-unused-vars
import { UsuarioDTO } from '../../models/usuario-list';
// eslint-disable-next-line no-unused-vars
import { CosechaFilterCriteria } from '../../models/cosecha';
import ProductoStore from '../../stores/producto.store';
// eslint-disable-next-line no-unused-vars
import ProductoDTO from '../../models/producto';
import _ from 'lodash';

const CosechaFilterModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState(
    {} as CosechaFilterCriteria,
  );
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  function onOpen() {
    setShowModal(true);
  }

  function onClose() {
    setShowModal(false);
  }

  function onOpenFromDate() {
    setShowFromDatePicker(true);
  }

  function onOpenToDate() {
    setShowToDatePicker(true);
  }

  function onFromDateChange(event: any, selectedDate: any) {
    setShowFromDatePicker(false);
    if (!_.isUndefined(selectedDate)) {
      setFromDate(selectedDate);
      setFilterCriteria({ ...filterCriteria, desde: selectedDate });
    } else {
      setFromDate(new Date());
    }
  }

  function onToDateChange(event: any, selectedDate: any) {
    setShowToDatePicker(false);
    if (!_.isUndefined(selectedDate)) {
      setToDate(selectedDate);
      setFilterCriteria({ ...filterCriteria, hasta: selectedDate });
    } else {
      setFromDate(new Date());
    }
  }

  function handleSalaSelect(itemValue: any) {
    setFilterCriteria({ ...filterCriteria, sala: parseInt(itemValue, 10) });
  }

  function handleTurnoSelect(itemValue: any) {
    setFilterCriteria({ ...filterCriteria, turno: parseInt(itemValue, 10) });
  }

  function handlePersonalSelect(itemValue: any) {
    setFilterCriteria({ ...filterCriteria, personal: parseInt(itemValue, 10) });
  }

  function handleProductoSelect(itemValue: any) {
    setFilterCriteria({ ...filterCriteria, producto: parseInt(itemValue, 10) });
  }

  function onFilter() {
    CosechaStore.setCosechaListFilterCriteria(filterCriteria);
    onClose();
  }

  useEffect(() => {
    SalaStore.getSalasListFromAPI();
    TurnoStore.getTurnosListFromAPI();
    UsuarioStore.getUsuariosListFromAPI();
    ProductoStore.getProductosListFromAPI();
  }, []);

  return (
    <>
      <Box alignItems="flex-start">
        <Button
          ml="2"
          bg="primary.900"
          _text={{ color: 'white' }}
          onPress={onOpen}>
          Filtros
        </Button>
      </Box>

      <Modal isOpen={showModal} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Filtros</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              {showFromDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={fromDate}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onFromDateChange}
                />
              )}
              <Button
                onPress={onOpenFromDate}
                bg="primary.900"
                _text={{ color: 'white' }}>
                {'Desde: ' + moment(fromDate).format('DD/MM/YYYY')}
              </Button>
              <Button
                onPress={onOpenToDate}
                bg="primary.900"
                _text={{ color: 'white' }}>
                {'Hasta: ' + moment(toDate).format('DD/MM/YYYY')}
              </Button>
              {showToDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={toDate}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onToDateChange}
                  minimumDate={fromDate}
                />
              )}
              <FormControl mb={1}>
                <FormControl.Label
                  _text={{
                    color: '#FFFFFF',
                    bold: true,
                  }}>
                  Turno
                </FormControl.Label>
                <Select
                  borderColor="primary.900"
                  selectedValue={filterCriteria.turno?.toString()}
                  minWidth={200}
                  placeholder="Seleccione un turno"
                  onValueChange={handleTurnoSelect}
                  _selectedItem={{
                    bg: 'primary.700',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}
                  _dark={{
                    color: '#FFFFFF',
                  }}>
                  <Select.Item label="Mañana" value="1" />
                  <Select.Item label="Tarde" value="2" />
                </Select>
              </FormControl>
              <FormControl mb={1}>
                <FormControl.Label
                  _text={{
                    color: '#FFFFFF',
                    bold: true,
                  }}>
                  Sala
                </FormControl.Label>
                <Select
                  borderColor="primary.900"
                  selectedValue={filterCriteria.sala?.toString()}
                  minWidth={200}
                  placeholder="Seleccione una sala"
                  onValueChange={handleSalaSelect}
                  _selectedItem={{
                    bg: 'primary.700',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}
                  _dark={{
                    color: '#FFFFFF',
                  }}>
                  {SalaStore.salasList.data.map(
                    (value: SalaDTO, index: number) => {
                      return (
                        <Select.Item
                          key={index}
                          label={value.nombre}
                          value={value.id.toString()}
                        />
                      );
                    },
                  )}
                </Select>
              </FormControl>
              <FormControl mb={1}>
                <FormControl.Label
                  _text={{
                    color: '#FFFFFF',
                    bold: true,
                  }}>
                  Personal
                </FormControl.Label>
                <Select
                  borderColor="primary.900"
                  selectedValue={filterCriteria.personal?.toString()}
                  minWidth={200}
                  placeholder="Seleccione un usuario"
                  onValueChange={handlePersonalSelect}
                  _selectedItem={{
                    bg: 'primary.700',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}
                  _dark={{
                    color: '#FFFFFF',
                  }}>
                  {UsuarioStore.usuariosList.data.map(
                    (value: UsuarioDTO, index: number) => {
                      return (
                        <Select.Item
                          key={index}
                          label={value.username}
                          value={value.id.toString()}
                        />
                      );
                    },
                  )}
                </Select>
              </FormControl>
              <FormControl mb={1}>
                <FormControl.Label
                  _text={{
                    color: '#FFFFFF',
                    bold: true,
                  }}>
                  Producto
                </FormControl.Label>
                <Select
                  borderColor="primary.900"
                  selectedValue={filterCriteria.producto?.toString()}
                  minWidth={200}
                  placeholder="Seleccione un producto"
                  onValueChange={handleProductoSelect}
                  _selectedItem={{
                    bg: 'primary.700',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt={1}
                  _dark={{
                    color: '#FFFFFF',
                  }}>
                  {ProductoStore.productosList.data.map(
                    (value: ProductoDTO, index: number) => {
                      return (
                        <Select.Item
                          key={index}
                          label={value.nombre}
                          value={value.id.toString()}
                        />
                      );
                    },
                  )}
                </Select>
              </FormControl>
              <Button
                onPress={onFilter}
                bg="primary.900"
                _text={{ color: 'white' }}>
                Filtrar
              </Button>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default observer(CosechaFilterModal);
