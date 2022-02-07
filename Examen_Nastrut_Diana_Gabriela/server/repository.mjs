import Sequelize from 'sequelize';


const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './sqlite/examen.db',
	define: {
		timestamps: false
	}
});

const Meeting = sequelize.define(
    'Meeting',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        description:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: 3
            }
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
        
    }
)

const Participant = sequelize.define(
    'Participant',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: 5
            }
        }
    }
)

Meeting.hasMany(Participant, { foreignKey: 'meetingId' });
Participant.belongsTo(Meeting, { foreignKey: 'meetingId'});

async function initialize(){
    await sequelize.authenticate();
    await sequelize.sync({alter:true});
}

export{
    initialize, Meeting, Participant
}