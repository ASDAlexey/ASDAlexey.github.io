import { RpcMessages } from '../../enums/rpc-messages.enum';
import { EventData, EventDataParams, EventDataResult } from '../../types/jsonrpc.interface';
import { generateGUID } from '../uuid.util';

/**
 * Создает объект данных макета события для сообщений RPC.
 *
 * @template T - Тип свойств params и result.
 *
 * @param {Object} input - Входные параметры.
 * @param {RpcMessages} input.method - Метод RPC.
 * @param {T['params']} [input.params] - Параметры для метода RPC.
 * @param {T['result']} [input.result] - Результат метода RPC.
 *
 * @returns {EventData<T>} - Объект данных макета события.
 */
export const createEventDataMock = <T extends { params?: EventDataParams; result?: EventDataResult }>({
  method,
  params,
  result,
}: {
  method: RpcMessages;
  params?: T['params'];
  result?: T['result'];
}): EventData<T> => {
  return {
    guid: generateGUID(),
    jsonrpc: '',
    method,
    params,
    result,
  };
};
