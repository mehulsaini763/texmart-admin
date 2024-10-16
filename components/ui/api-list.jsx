'use client';

import { useParams } from 'next/navigation';
import ApiAlert from './api-alert';

const ApiList = ({ entityName, entityIdName }) => {
  const params = useParams();

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stores/${params.storeId}`;

  return (
    <>
      <ApiAlert title={'GET'} variant="public" description={`${baseUrl}/${entityName}/`} />
      <ApiAlert title={'GET'} variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title={'POST'} variant="admin" description={`${baseUrl}/${entityName}/`} />
      <ApiAlert title={'PATCH'} variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title={'DELETE'} variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
    </>
  );
};

export default ApiList;
