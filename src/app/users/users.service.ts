import { Injectable } from "../../core";
import { UserModel } from "./users.model";

@Injectable()
export class UsersService {
    db: UserModel[] = [
        {
            id: 1,
            name: "James Anderson",
            email: "james.anderson@gmail.com"
        },
        {
            id: 2,
            name: "Sofia Rodriguez",
            email: "s.rodriguez@outlook.com"
        },
        {
            id: 3,
            name: "Michael Chen",
            email: "mchen.dev@techcorp.io"
        },
        {
            id: 4,
            name: "Emily Watson",
            email: "emily.watson92@yahoo.com"
        },
        {
            id: 5,
            name: "Aarav Patel",
            email: "aarav.patel@designstudio.net"
        },
        {
            id: 6,
            name: "Isabella Rossi",
            email: "rossi.isabella@proton.me"
        },
        {
            id: 7,
            name: "David Miller",
            email: "d.miller@financialgroup.com"
        },
        {
            id: 8,
            name: "Sarah Jenkins",
            email: "sarahj_creative@icloud.com"
        },
        {
            id: 9,
            name: "Liam O'Connor",
            email: "liam.oconnor@marketinghub.co"
        },
        {
            id: 10,
            name: "Amara Okafor",
            email: "amara.okafor@university.edu"
        },
        {
            id: 11,
            name: "Benjamin Wright",
            email: "bwright@consultancy.org"
        },
        {
            id: 12,
            name: "Chloe Dubois",
            email: "chloe.dubois88@gmail.com"
        },
        {
            id: 13,
            name: "Hassan Ali",
            email: "hassan.ali@globalshipping.com"
        },
        {
            id: 14,
            name: "Olivia Thompson",
            email: "olivia.t@wellnesscenter.org"
        },
        {
            id: 15,
            name: "Lucas Silva",
            email: "lucas.silva@softwarelab.com"
        },
        {
            id: 16,
            name: "Mia Yamamoto",
            email: "m.yamamoto@artgallery.jp"
        },
        {
            id: 17,
            name: "Ethan Harris",
            email: "ethan.harris@urbanarch.com"
        },
        {
            id: 18,
            name: "Elena Petrov",
            email: "elena.petrov@bio-research.com"
        },
        {
            id: 19,
            name: "Noah Mitchell",
            email: "nmitchell@freelance.io"
        },
        {
            id: 20,
            name: "Zoe Campbell",
            email: "zoe.campbell@mediapress.net"
        }
    ];

    getAll(offset?: number, limit?: number): UserModel[] {
        const _offset = offset ?? undefined;
        const _limit = limit ? (offset ?? 0) + limit : undefined;
        return this.db.slice(_offset, _limit);
    }

    findOne(id: number): UserModel | undefined {
        return this.db.find(user => user.id === id);
    }

    add(name: string, email: string): UserModel {
        const isEmailUnique = this.db.find(u => u.email === email) === undefined;
        if (!isEmailUnique) throw new Error('This email address has already been used');
        const newID = this.db.length ? Math.max(...this.db.map(user => user.id)) + 1 : 1;
        const newUser: UserModel = {
            id: newID,
            name,
            email
        };
        this.db.push(newUser);
        return newUser;
    }
}