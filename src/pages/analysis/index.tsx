import { useState } from "react";
import { Card, Modal, Pagination, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Create from "./create";
import More from "./more";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

import './style.scss'

const Analysis = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [createModal, showCreateModal] = useState({
    open: false,
    data: {}
  });
  const [moreAnalysis, showMoreAnalysis] = useState<{
    isOpen: boolean;
    data: object;
  }>({
    isOpen: false,
    data: {}
  });
  const [page, setPage] = useState();

  const { mutate } = usePost();

  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить Analysis?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/analysis/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`analysis`],
            });
            notification["success"]({
              message: t("Успешно удалена"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", t("Произошло ошибка!")),
              duration: 2,
            });
          },
        }
      );
    }
  };

  return (
    <div className="flex">
      <Modal
        open={get(createModal, "open")}
        onOk={() => showCreateModal({ open: true, data: {} })}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        width={700}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal }} />
      </Modal>
      <Modal
        open={moreAnalysis.isOpen}
        onCancel={() => showMoreAnalysis({ isOpen: false, data: {} })}
        footer={null}
        centered
        title={t("Analysis in detail")}
        width={500}
        destroyOnClose
      >
        <More {...{ moreAnalysis }} />
      </Modal>
      <div>
        <Container.All name="analysis" url="/analysis" params={{ limit: 8, page }}>
          {({ items, meta }) => {
            return (
              <div>
                <Button
                  title={t("Create analysis")}
                  icon={<CreateDoc />}
                  size="large"
                  onClick={() => showCreateModal({ open: true, data: {} })}
                />
                <div className="grid grid-cols-4 gap-4 mt-[30px]">
                  {items.map((card) => {
                    return (
                      <>
                        <div>
                          <Card
                            hoverable
                            style={{ width: 260, marginRight: 15 }}
                            onClick={() => showMoreAnalysis({ isOpen: true, data: card })}
                          >
                            <Meta
                              className="pb-[60px]"
                              title={
                                <div className="">
                                  <p>{t("name")} - {(get(card, "name", ""))}</p>
                                </div>
                              }
                            description={
                              <div className="">
                                <p>{t("number")} - {(get(card, "number", ""))}</p>
                              </div>
                            }
                            />
                            <div className="btnPanel">
                              <div
                                className="editBtn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  showCreateModal({ open: true, data: card })
                                }}
                              >
                                <Edit />
                              </div>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDeleteHandler(get(card, "_id", ""))
                                }}
                                className="deleteBtn"
                              >
                                <Delete />
                              </div>
                            </div>
                          </Card>
                        </div>
                      </>
                    );
                  })}
                </div>
                {meta && meta.perPage && (
                  <div className="mt-[20px] flex justify-end">
                    <Pagination
                      current={meta.currentPage}
                      pageSize={meta.perPage}
                      total={(meta.totalCount)}
                      onChange={(page: any) => {
                        setPage(page)
                        window.scrollTo({
                          behavior: "smooth",
                          top: 0,
                          left: 0
                        })
                      }}
                    />
                  </div>
                )}
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default Analysis;