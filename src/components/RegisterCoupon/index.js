import React from 'react';
import {
  Form,
  Input,
  Button, Modal, Alert, Space,
} from 'antd';
import copy from "copy-to-clipboard";



const RegisterCoupon = ({visible,loading,showPromoCode,coupon,campaignIdExternal,detail,handleOk,handleCancel,handleSubmit}) => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    campaignIdExternal: campaignIdExternal
  });



  return (
    <Modal forceRender  visible={visible}
           onOk={handleOk}
           onCancel={handleCancel}
           footer={[
             <Button key="Regresar" onClick={handleCancel}>Regresar</Button>,
             <Button key="Generar Codigo" type="primary"  loading={loading} onClick={ () => form.submit()}>
               Generar Código
             </Button>,
           ]}

           title={<h4 className="gx-text-primary gx-text-capitalize gx-mb-0">
             <i className="icon icon-mail-open gx-mr-3"

             />
             Pago-Facil Códigos Promocionales</h4>
           }>

      <h2 className="gx-mb-3 gx-mb-xxl-4 gx-font-weight-light">Ingresa tu nombre y correo y obten tu código promocional</h2>
      <Form className="gx-signup-form gx-form-row0 gx-mb-0"   form={form}
            onFinish={handleSubmit}>

        <Form.Item
          className="gx-mb-3"
          name="name"
          rules={[{ required: true, message: 'Porfavor ingrese su nombre!', whitespace: true }]}
        >
          <Input type="Text" placeholder="Nombre"/>
        </Form.Item>

        <Form.Item
          className="gx-mb-3"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'El email ingresado es invalido',
            },
            {
              required: true,
              message: 'Porfavor ingrese su email!',
            },
          ]}
        >
          <Input type="Email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          hidden={true}
          name="campaignIdExternal"
        >
          <Input  />
        </Form.Item>




        { showPromoCode ?      <Alert
          description="Código Promocional solo es validó hasta el 23/12/2022."
          message={coupon.couponCode}
          type="success"
          action={
            <Space>
              <Button size="small" type="ghost" onClick={()=> copy(coupon.couponCode)}>
                Copiar
              </Button>
            </Space>
          }
          closable
        /> : null }

        { detail?  <Alert message={detail} type="warning" />  : null }


      </Form>
    </Modal>
  );
};

export  default RegisterCoupon;

