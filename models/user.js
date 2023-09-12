const { DataTypes } = require("sequelize");
const Model = (sequelize) => {
  //마이프로필
  const MyProfile = sequelize.define(
    "MyProfile",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "MyProfile",
      timestamps: false,
    }
  );
  // 유저
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nick_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pw: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "User",
      timestamps: false,
    }
  );
  // 프로젝트
  const Project = sequelize.define(
    "Project",
    {
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      video: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      period: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      thumnail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      frontnum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      backnum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      members: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      git_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "Project",
      timestamps: false,
    }
  );
  // 커뮤니티
  const Community = sequelize.define(
    "Community",
    {
      community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      community_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "Community",
      timestamps: false,
    }
  );
  //후기
  const Review = sequelize.define(
    "Review",
    {
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "Review",
      timestamps: false,
    }
  );
  // 카트
  const Cart = sequelize.define(
    "Cart",
    {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Cart",
      timestamps: false,
    }
  );
  // 태그
  const Tag = sequelize.define(
    "Tag",
    {
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      tag_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "Tag",
      timestamps: false,
    }
  );
  // 이미지
  const Img = sequelize.define(
    "Img",
    {
      img_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "Img",
      timestamps: false,
    }
  );
  // 채팅방
  const Room = sequelize.define(
    "Room",
    {
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      room_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "Room",
      timestamps: false,
    }
  );
  // 메세지
  const Messages = sequelize.define(
    "Messages",
    {
      message_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nick_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      send_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Messages",
      timestamps: false,
    }
  );
  // 유저 채팅방
  const UserRoom = sequelize.define(
    "UserRoom",
    {
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "UserRoom",
      timestamps: false,
    }
  );
  // 유저 리코프런
  const UserRecoplearn = sequelize.define(
    "UserRecoplearn",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Recoplearn_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "UserRecoplearn",
      timestamps: false,
    }
  );
  // 프로젝트 태그
  const ProjectTag = sequelize.define(
    "ProjectTag",
    {
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "ProjectTag",
      timestamps: false,
    }
  );
  // 리코프런
  const Recoplearn = sequelize.define(
    "Recoplearn",
    {
      Recoplearn_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      front_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      front_goal_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      back_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      back_goal_num: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      current_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      goal_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      frontability: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      backability: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      recoplearn_goal: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "Recoplearn",
      timestamps: false,
    }
  );
  // 관계 정의
  MyProfile.belongsTo(User, { foreignKey: "user_id" }); // 마이프로필 -> 유저
  MyProfile.belongsTo(Project, { foreignKey: "project_id" }); // 마이프로필 -> 프로젝트
  MyProfile.belongsTo(Cart, { foreignKey: "cart_id" }); // 마이프로필 -> 카트
  Community.belongsTo(User, { foreignKey: "user_id" }); // 커뮤니티 -> 유저
  Community.belongsTo(Project, { foreignKey: "project_id" }); // 커뮤니티 -> 프로젝트
  Review.belongsTo(User, { foreignKey: "user_id" }); // 후기 -> 유저
  Review.belongsTo(Project, { foreignKey: "project_id" }); // 후기 -> 프로젝트
  Cart.belongsTo(Project, { foreignKey: "project_id" }); // 카트 -> 프로젝트
  Img.belongsTo(Project, { foreignKey: "project_id" }); // 이미지 -> 프로젝트
  Messages.belongsTo(User, { foreignKey: "user_id" }); // 메세지 -> 유저
  Messages.belongsTo(Room, { foreignKey: "room_id" }); // 메세지 -> 채팅방
  UserRoom.belongsTo(Room, { foreignKey: "room_id" }); // 유저 채팅방 -> 채팅방
  UserRoom.belongsTo(User, { foreignKey: "user_id" }); // 유저 채팅방 -> 유저
  UserRecoplearn.belongsTo(User, { foreignKey: "user_id" }); // 유저 리코프런 -> 유저
  UserRecoplearn.belongsTo(Recoplearn, { foreignKey: "Recoplearn_id" }); // 유저 리코프런 -> 리코프런
  ProjectTag.belongsTo(Project, { foreignKey: "project_id" }); // 프로젝트 태그 -> 프로젝트
  ProjectTag.belongsTo(Tag, { foreignKey: "tag_id" }); // 프로젝트 태그 -> 태그
  Recoplearn.belongsTo(Project, { foreignKey: "project_id" }); // 리코프런 -> 프로젝트
  return {
    MyProfile,
    User,
    Project,
    Community,
    Cart,
    Tag,
    Img,
    Room,
    Messages,
    UserRoom,
    UserRecoplearn,
    ProjectTag,
    Recoplearn,
    Review,
  };
};
module.exports = Model;
