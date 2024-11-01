import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Form, Select, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponents from "../InputComponents/InputComponents";
import * as ProductService from "../../services/ProductService"
import * as message from '../../components/Message/message'
import { useMutationHook } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import { renderOptions } from "../../utils";
const AdminProduct = () => {
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [typeSelect, setTypeSelect] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const searchInput = useRef(null);
    const inittial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        newType: ''
    })
    const [stateProduct, setStateProduct] = useState(inittial())

    const [stateProductDetails, setStateProductDetails] = useState(inittial())


    const [form] = Form.useForm();
    const mutation = useMutationHook(
        (data) => {
            const {
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock } = data
            const res = ProductService.createProduct({
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock
            })
            return res
        }
    )



    const mutationUpdate = useMutationHook(
        (data) => {
            const {
                id,
                token,
                ...rests } = data
            const res = ProductService.updateProduct(
                id,
                token,
                { ...rests }
            )
            return res
        }
    )

    const mutationDeleted = useMutationHook(
        (data) => {
            const {
                id,
                token } = data
            const res = ProductService.deleteProduct(
                id,
                token)
            return res
        }
    )

    const mutationDeletedMany = useMutationHook(
        (data) => {
            const {

                token, ...ids } = data
            const res = ProductService.deleteManyProduct(
                ids,
                token)
            return res
        }
    )

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }


    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock
            })
        }
        setIsPendingUpdate(false)

    }


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue({
                name: stateProductDetails.name,
                price: stateProductDetails.price,
                description: stateProductDetails.description,
                rating: stateProductDetails.rating,
                image: stateProductDetails.image,
                type: stateProductDetails.type,
                countInStock: stateProductDetails.countInStock
            });
        } else {
            form.setFieldsValue(inittial());
        }

    }, [form, stateProductDetails, isModalOpen]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsPendingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])



    const handleDetailsProduct = async () => {
        setIsOpenDrawer(true);
    }


    const handleDeleteManyProducts = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        return res
    }

    const { data, isPending, isSuccess, isError } = mutation
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany


    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })

    const { isPending: isPendingProduct, data: products } = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponents
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={`${selectedKeys[0] || ''}`}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>


                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                },

            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            }

        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3.0',
                    value: '>=',
                },
                {
                    text: '<= 3.0',
                    value: '<=',
                },

            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.price) >= 3.0
                }
                return Number(record.price) <= 3.0
            }

        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction

        },
    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success();
        } else if (isErrorDeletedMany) {
            message.error();
        }
    }, [isSuccessDeletedMany])


    useEffect(() => {
        if (isSuccess && dataDeleted?.status === 'OK') {
            message.success();
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error();
        }
    }, [isSuccessDeleted])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields()
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success();
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error();
        }
    }, [isSuccessUpdated])




    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }



    const handleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields()
    };

    console.log('stateProduct', stateProduct)

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }


    const handleOnChangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }



    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    // const onUpdateProduct = () => {
    //     mutationUpdate.mutate({ id: rowSelected, token: user.access_token, ...stateProductDetails }, {
    //         onSettled: () => {
    //             queryProduct.refetch()
    //         }
    //     })
    // }

    const onUpdateProduct = () => {
        const updatedData = { ...stateProductDetails };
        if (updatedData.type === 'add_type') {
            updatedData.type = updatedData.newType; // Set type to newType if 'add_type'
            delete updatedData.newType; // Remove newType from the object
        }
        mutationUpdate.mutate({ id: rowSelected, token: user.access_token, ...updatedData }, {
            onSettled: () => {
                queryProduct.refetch();
            }
        });
    };

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value
        })
    }

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyProducts} columns={columns} isPending={isPendingProduct} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }}
                />

            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} >
                <Loading isPending={isPending}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}

                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProduct.name} onChange={handleOnChange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >
                            <Select
                                name="type"
                                // defaultValue="lucy"
                                // style={{
                                //     width: 120,
                                // }}
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(typeProduct?.data?.data)}
                            />
                        </Form.Item>



                        {stateProduct.type === 'add_type' && (
                            <Form.Item
                                label='New type'
                                name="newType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new-type!',
                                    },
                                ]}
                            >
                                <InputComponents value={stateProduct.newType} onChange={handleOnChange} name="newType" />
                            </Form.Item>
                        )}


                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your countInStock!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProduct.price} onChange={handleOnChange} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your rating!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProduct.description} onChange={handleOnChange} name="description" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your image!',
                                },
                            ]}
                        >
                            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}>
                                    <Button >Select File</Button>
                                    {stateProduct?.image && (
                                        <img src={stateProduct?.image} style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginLeft: '10px'
                                        }} alt="avatar" />
                                    )}
                                </div>
                            </WrapperUploadFile>

                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='90%'>
                <Loading isPending={isPendingUpdate || isPendingUpdated} >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 2,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}

                        onFinish={onUpdateProduct}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
                        </Form.Item>

                        {/* <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
                        </Form.Item> */}

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >
                            <Select
                                name="type"
                                value={stateProductDetails.type}
                                onChange={(value) => {
                                    setStateProductDetails({
                                        ...stateProductDetails,
                                        type: value
                                    })
                                }}
                                options={renderOptions(typeProduct?.data?.data)}
                            />
                        </Form.Item>

                        {stateProductDetails.type === 'add_type' && (
                            <Form.Item
                                label='New type'
                                name="newType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new-type!',
                                    },
                                ]}
                            >
                                <InputComponents value={stateProductDetails.newType} onChange={handleOnChangeDetails} name="newType" />
                            </Form.Item>
                        )}


                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your countInStock!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your rating!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating" />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <InputComponents value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your image!',
                                },
                            ]}
                        >
                            <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px'
                                }}>
                                    <Button >Select File</Button>
                                    {stateProductDetails?.image && (
                                        <img src={stateProductDetails?.image} style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginLeft: '10px'
                                        }} alt="avatar" />
                                    )}
                                </div>
                            </WrapperUploadFile>

                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
                <Loading isPending={isPendingDeleted}>
                    <div>Bạn có chắc chắn xóa sản phẩm này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}
export default AdminProduct