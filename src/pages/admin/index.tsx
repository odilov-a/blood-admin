import { useState } from "react";
import { Card, Modal } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import Update from "./update";
import { Edit } from "assets/images/icons";

const User = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [editModal, showEditModal] = useState(false);
  const [createModal, showCreateModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [successed, setSuccess] = useState<boolean>(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    data: null;
  }>({
    isOpen: false,
    data: null,
  });
  const { mutate } = usePost();
  const onEdit = (item: object) => {
    showEditModal(true);
    setSelectedCard(item);
  };

  return (
    <div className="flex">
      <Modal
        open={editModal}
        onOk={() => showEditModal(true)}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title={t("Edit user")}
        width={900}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <Container.All name="users" url="users/get-me">
          {({ items }) => {
            return (
              <div>
                <div className="grid grid-cols-4 gap-4 mt-[30px]">
                  {items.map((card) => {
                    return (
                      <>
                        <div>
                          <Card
                            hoverable
                            style={{ width: 300, marginRight: 15 }}
                          >
                            <Meta
                              className="pb-[60px]"
                              title={
                                <div className="">
                                  <p>{t("Admin nomi")} - {(get(card, "login", ""))}</p>
                                  <p>{t("Admin paroli")} - {(get(card, "password", ""))}</p>
                                </div>
                              }
                            />
                            <div className="btnPanel">
                              <div
                                className="editBtn"
                                onClick={() => onEdit(card)}
                              >
                                <Edit />
                              </div>
                            </div>
                          </Card>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default User;