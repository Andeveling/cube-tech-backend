import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  FloatAttribute,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferToken extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAccesoryProfileAccesoryProfile
  extends CollectionTypeSchema {
  info: {
    singularName: 'accesory-profile';
    pluralName: 'accesory-profiles';
    displayName: 'accesory_profile';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 100;
      }>;
    price: DecimalAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::accesory-profile.accesory-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::accesory-profile.accesory-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCremonaCremona extends CollectionTypeSchema {
  info: {
    singularName: 'cremona';
    pluralName: 'cremonas';
    displayName: 'cremona';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 100;
      }>;
    price: DecimalAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::cremona.cremona',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::cremona.cremona',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCremonaQuantityCremonaQuantity
  extends CollectionTypeSchema {
  info: {
    singularName: 'cremona-quantity';
    pluralName: 'cremona-quantities';
    displayName: 'cremona_quantity';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    quantity: IntegerAttribute & DefaultTo<1>;
    cremona: RelationAttribute<
      'api::cremona-quantity.cremona-quantity',
      'oneToOne',
      'api::cremona.cremona'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::cremona-quantity.cremona-quantity',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::cremona-quantity.cremona-quantity',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFrameProfileFrameProfile extends CollectionTypeSchema {
  info: {
    singularName: 'frame-profile';
    pluralName: 'frame-profiles';
    displayName: 'frame_profile';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 100;
      }>;
    price: DecimalAttribute & RequiredAttribute & DefaultTo<0>;
    reinforcement_profile: RelationAttribute<
      'api::frame-profile.frame-profile',
      'oneToOne',
      'api::reinforcement-profile.reinforcement-profile'
    >;
    cuttingGlassSize: IntegerAttribute & RequiredAttribute & DefaultTo<22>;
    cuttingTransomSize: IntegerAttribute;
    cuttingSashSize: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::frame-profile.frame-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::frame-profile.frame-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiGlassGlass extends CollectionTypeSchema {
  info: {
    singularName: 'glass';
    pluralName: 'glasses';
    displayName: 'glass';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    price: DecimalAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::glass.glass',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::glass.glass',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiGlassCaliberGlassCaliber extends CollectionTypeSchema {
  info: {
    singularName: 'glass-caliber';
    pluralName: 'glass-calibers';
    displayName: 'glass_caliber';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    caliber: IntegerAttribute;
    title: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::glass-caliber.glass-caliber',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::glass-caliber.glass-caliber',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiGlassGlazingBeadSystemGlassGlazingBeadSystem
  extends CollectionTypeSchema {
  info: {
    singularName: 'glass-glazing-bead-system';
    pluralName: 'glass-glazing-bead-systems';
    displayName: 'glass_glazing_bead_system';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute;
    glass: RelationAttribute<
      'api::glass-glazing-bead-system.glass-glazing-bead-system',
      'oneToOne',
      'api::glass.glass'
    >;
    glass_caliber: RelationAttribute<
      'api::glass-glazing-bead-system.glass-glazing-bead-system',
      'oneToOne',
      'api::glass-caliber.glass-caliber'
    >;
    glazing_bead_profile: RelationAttribute<
      'api::glass-glazing-bead-system.glass-glazing-bead-system',
      'oneToOne',
      'api::glazing-bead-profile.glazing-bead-profile'
    >;
    system_pvc: RelationAttribute<
      'api::glass-glazing-bead-system.glass-glazing-bead-system',
      'manyToOne',
      'api::system-pvc.system-pvc'
    > &
      PrivateAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::glass-glazing-bead-system.glass-glazing-bead-system',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::glass-glazing-bead-system.glass-glazing-bead-system',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiGlazingBeadProfileGlazingBeadProfile
  extends CollectionTypeSchema {
  info: {
    singularName: 'glazing-bead-profile';
    pluralName: 'glazing-bead-profiles';
    displayName: 'glazing_bead_profile';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 100;
      }>;
    price: DecimalAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::glazing-bead-profile.glazing-bead-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::glazing-bead-profile.glazing-bead-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiHardwareKitHardwareKit extends CollectionTypeSchema {
  info: {
    singularName: 'hardware-kit';
    pluralName: 'hardware-kits';
    displayName: 'hardware_kit';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    total: FloatAttribute;
    mullion_quantities: RelationAttribute<
      'api::hardware-kit.hardware-kit',
      'oneToMany',
      'api::mullion-quantity.mullion-quantity'
    >;
    striker_quantities: RelationAttribute<
      'api::hardware-kit.hardware-kit',
      'oneToMany',
      'api::striker-quantity.striker-quantity'
    >;
    cremona_quantities: RelationAttribute<
      'api::hardware-kit.hardware-kit',
      'oneToMany',
      'api::cremona-quantity.cremona-quantity'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::hardware-kit.hardware-kit',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::hardware-kit.hardware-kit',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMullionMullion extends CollectionTypeSchema {
  info: {
    singularName: 'mullion';
    pluralName: 'mullions';
    displayName: 'mullion';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute & RequiredAttribute;
    price: DecimalAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::mullion.mullion',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::mullion.mullion',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMullionQuantityMullionQuantity
  extends CollectionTypeSchema {
  info: {
    singularName: 'mullion-quantity';
    pluralName: 'mullion-quantities';
    displayName: 'mullion_quantity';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    quantity: IntegerAttribute & DefaultTo<1>;
    mullion: RelationAttribute<
      'api::mullion-quantity.mullion-quantity',
      'oneToOne',
      'api::mullion.mullion'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::mullion-quantity.mullion-quantity',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::mullion-quantity.mullion-quantity',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiReinforcementProfileReinforcementProfile
  extends CollectionTypeSchema {
  info: {
    singularName: 'reinforcement-profile';
    pluralName: 'reinforcement-profiles';
    displayName: 'reinforcement_profile';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute &
      SetMinMaxLength<{
        maxLength: 100;
      }>;
    price: DecimalAttribute;
    reinforcement_screw: RelationAttribute<
      'api::reinforcement-profile.reinforcement-profile',
      'oneToOne',
      'api::reinforcement-screw.reinforcement-screw'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::reinforcement-profile.reinforcement-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::reinforcement-profile.reinforcement-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiReinforcementScrewReinforcementScrew
  extends CollectionTypeSchema {
  info: {
    singularName: 'reinforcement-screw';
    pluralName: 'reinforcement-screws';
    displayName: 'reinforcement_screw';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute;
    name: StringAttribute & RequiredAttribute;
    price: DecimalAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::reinforcement-screw.reinforcement-screw',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::reinforcement-screw.reinforcement-screw',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSashProfileSashProfile extends CollectionTypeSchema {
  info: {
    singularName: 'sash-profile';
    pluralName: 'sash-profiles';
    displayName: 'sash_profile';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute & RequiredAttribute;
    price: DecimalAttribute;
    reinforcement_profile: RelationAttribute<
      'api::sash-profile.sash-profile',
      'oneToOne',
      'api::reinforcement-profile.reinforcement-profile'
    >;
    cuttingGlassSize: IntegerAttribute & RequiredAttribute & DefaultTo<101>;
    cuttingTransomSize: IntegerAttribute;
    cuttingSashSize: IntegerAttribute & DefaultTo<0>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::sash-profile.sash-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::sash-profile.sash-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiScrewScrew extends CollectionTypeSchema {
  info: {
    singularName: 'screw';
    pluralName: 'screws';
    displayName: 'screw';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 100;
      }>;
    price: DecimalAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::screw.screw',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::screw.screw',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiStrikerStriker extends CollectionTypeSchema {
  info: {
    singularName: 'striker';
    pluralName: 'strikers';
    displayName: 'striker';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute & RequiredAttribute;
    price: DecimalAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::striker.striker',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::striker.striker',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiStrikerQuantityStrikerQuantity
  extends CollectionTypeSchema {
  info: {
    singularName: 'striker-quantity';
    pluralName: 'striker-quantities';
    displayName: 'striker_quantity';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    striker: RelationAttribute<
      'api::striker-quantity.striker-quantity',
      'oneToOne',
      'api::striker.striker'
    >;
    quantity: IntegerAttribute & DefaultTo<1>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::striker-quantity.striker-quantity',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::striker-quantity.striker-quantity',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSystemPvcSystemPvc extends CollectionTypeSchema {
  info: {
    singularName: 'system-pvc';
    pluralName: 'system-pvcs';
    displayName: 'system-pvc';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    window_models: RelationAttribute<
      'api::system-pvc.system-pvc',
      'oneToMany',
      'api::window-model.window-model'
    >;
    glass_glazing_bead_systems: RelationAttribute<
      'api::system-pvc.system-pvc',
      'oneToMany',
      'api::glass-glazing-bead-system.glass-glazing-bead-system'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::system-pvc.system-pvc',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::system-pvc.system-pvc',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTransomProfileTransomProfile extends CollectionTypeSchema {
  info: {
    singularName: 'transom-profile';
    pluralName: 'transom-profiles';
    displayName: 'transom_profile';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    id_provider: StringAttribute & RequiredAttribute & UniqueAttribute;
    name: StringAttribute & RequiredAttribute;
    price: DecimalAttribute & RequiredAttribute;
    reinforcement_profile: RelationAttribute<
      'api::transom-profile.transom-profile',
      'oneToOne',
      'api::reinforcement-profile.reinforcement-profile'
    >;
    cuttingGlassSize: IntegerAttribute;
    cuttingTransomSize: IntegerAttribute;
    cuttingSashSize: IntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::transom-profile.transom-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::transom-profile.transom-profile',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiWindowModelWindowModel extends CollectionTypeSchema {
  info: {
    singularName: 'window-model';
    pluralName: 'window-models';
    displayName: 'window_model';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute;
    frame_profile: RelationAttribute<
      'api::window-model.window-model',
      'oneToOne',
      'api::frame-profile.frame-profile'
    >;
    sash_profile: RelationAttribute<
      'api::window-model.window-model',
      'oneToOne',
      'api::sash-profile.sash-profile'
    >;
    transom_profile: RelationAttribute<
      'api::window-model.window-model',
      'oneToOne',
      'api::transom-profile.transom-profile'
    >;
    system_pvc: RelationAttribute<
      'api::window-model.window-model',
      'manyToOne',
      'api::system-pvc.system-pvc'
    > &
      PrivateAttribute;
    hardware_kit: RelationAttribute<
      'api::window-model.window-model',
      'oneToOne',
      'api::hardware-kit.hardware-kit'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::window-model.window-model',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::window-model.window-model',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::accesory-profile.accesory-profile': ApiAccesoryProfileAccesoryProfile;
      'api::cremona.cremona': ApiCremonaCremona;
      'api::cremona-quantity.cremona-quantity': ApiCremonaQuantityCremonaQuantity;
      'api::frame-profile.frame-profile': ApiFrameProfileFrameProfile;
      'api::glass.glass': ApiGlassGlass;
      'api::glass-caliber.glass-caliber': ApiGlassCaliberGlassCaliber;
      'api::glass-glazing-bead-system.glass-glazing-bead-system': ApiGlassGlazingBeadSystemGlassGlazingBeadSystem;
      'api::glazing-bead-profile.glazing-bead-profile': ApiGlazingBeadProfileGlazingBeadProfile;
      'api::hardware-kit.hardware-kit': ApiHardwareKitHardwareKit;
      'api::mullion.mullion': ApiMullionMullion;
      'api::mullion-quantity.mullion-quantity': ApiMullionQuantityMullionQuantity;
      'api::reinforcement-profile.reinforcement-profile': ApiReinforcementProfileReinforcementProfile;
      'api::reinforcement-screw.reinforcement-screw': ApiReinforcementScrewReinforcementScrew;
      'api::sash-profile.sash-profile': ApiSashProfileSashProfile;
      'api::screw.screw': ApiScrewScrew;
      'api::striker.striker': ApiStrikerStriker;
      'api::striker-quantity.striker-quantity': ApiStrikerQuantityStrikerQuantity;
      'api::system-pvc.system-pvc': ApiSystemPvcSystemPvc;
      'api::transom-profile.transom-profile': ApiTransomProfileTransomProfile;
      'api::window-model.window-model': ApiWindowModelWindowModel;
    }
  }
}
