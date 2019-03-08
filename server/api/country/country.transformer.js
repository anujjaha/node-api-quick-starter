import _ from "lodash";

class CountryTransformer {
    // this will transform the object
    // to desire output
    transform(country) {
        const object = {
            id: country.id,
            name: country.name,
            code: country.sortname,
            status: country.statusText(),
            created_at: country.createdAtDisplay(),
            updated_at: country.updated_at ? country.updated_at : '',
        };

        if (country.hasOwnProperty("State")) {
            object.State = country.State;
        }

        return object;
    }

    transformCollection(countries) {
        var data = [];

        if(countries)
        {
            for(var i = 0; i < countries.length; i++)
            {
                if(countries[i])
                {
                    data.push(this.transform(countries[i]));
                }
            }
        }

        return data;
    }
}

module.exports = new CountryTransformer();