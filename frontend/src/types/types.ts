/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CommentDto {
  id: number;
  user: UserDto;
  parent?: CommentDto;
  post: PostDto;
  content: string;
  /** @format date-time */
  created_at: string;
}

export interface UserDto {
  id: number;
  /**
   * @maxLength 50
   * @uniqueItems true
   */
  name: string;
  /** @uniqueItems true */
  email: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
  posts: PostDto[];
  comments: CommentDto[];
  /** @format date-time */
  created_at: string;
}

export interface TagDto {
  id: number;
  content: string;
}

export interface PostDto {
  id: number;
  user: UserDto;
  /** @maxLength 250 */
  title: string;
  content: string;
  tags: TagDto[];
  comments: CommentDto[];
  /** @format date-time */
  created_at: string;
}

export interface SignUpDto {
  /**
   * @maxLength 50
   * @uniqueItems true
   */
  name: string;
  /** @uniqueItems true */
  email: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) => (input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input),
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob ? property : typeof property === 'object' && property !== null ? JSON.stringify(property) : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Joroom 2.0 API
 * @version 1.0
 * @contact
 *
 * Joroom 2.0 API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetHello
   * @request GET:/
   */
  getHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  user = {
    /**
     * No description
     *
     * @tags Users
     * @name FindAll
     * @request GET:/user
     */
    findAll: (params: RequestParams = {}) =>
      this.request<UserDto[], any>({
        path: `/user`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name FindOne
     * @request GET:/user/{id}
     */
    findOne: (id: string, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/user/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name Delete
     * @request DELETE:/user/{id}
     */
    delete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name FindAllPostsByUserId
     * @request GET:/user/{id}/posts
     */
    findAllPostsByUserId: (id: string, params: RequestParams = {}) =>
      this.request<PostDto[], any>({
        path: `/user/${id}/posts`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name FindAllCommentsByUserId
     * @request GET:/user/{id}/comments
     */
    findAllCommentsByUserId: (id: string, params: RequestParams = {}) =>
      this.request<CommentDto[], any>({
        path: `/user/${id}/comments`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  post = {
    /**
     * No description
     *
     * @tags Posts
     * @name FindAll
     * @request GET:/post
     */
    findAll: (params: RequestParams = {}) =>
      this.request<PostDto[], any>({
        path: `/post`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name FindOne
     * @request GET:/post/{id}
     */
    findOne: (id: string, params: RequestParams = {}) =>
      this.request<PostDto, any>({
        path: `/post/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name Delete
     * @request DELETE:/post/{id}
     */
    delete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/post/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name FindaAllById
     * @request GET:/post/{id}/comments
     */
    findaAllById: (id: string, params: RequestParams = {}) =>
      this.request<CommentDto[], any>({
        path: `/post/${id}/comments`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  comment = {
    /**
     * No description
     *
     * @tags Comments
     * @name FindOne
     * @request GET:/comment/{id}
     */
    findOne: (id: string, params: RequestParams = {}) =>
      this.request<CommentDto, any>({
        path: `/comment/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name Delete
     * @request DELETE:/comment/{id}
     */
    delete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/comment/${id}`,
        method: 'DELETE',
        ...params,
      }),
  };
  tag = {
    /**
     * No description
     *
     * @tags Tags
     * @name FindAll
     * @request GET:/tag
     */
    findAll: (params: RequestParams = {}) =>
      this.request<TagDto[], any>({
        path: `/tag`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name FindOne
     * @request GET:/tag/{id}
     */
    findOne: (id: string, params: RequestParams = {}) =>
      this.request<TagDto, any>({
        path: `/tag/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name Delete
     * @request DELETE:/tag/{id}
     */
    delete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/tag/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tags
     * @name FindAllPostsByTagId
     * @request GET:/tag/{id}/post
     */
    findAllPostsByTagId: (id: string, params: RequestParams = {}) =>
      this.request<PostDto[], any>({
        path: `/tag/${id}/post`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name SignUp
     * @request POST:/auth/sign-up
     */
    signUp: (data: SignUpDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/sign-up`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name SignIn
     * @request POST:/auth/sign-in
     */
    signIn: (data: SignInDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/sign-in`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name SignOut
     * @request POST:/auth/sign-out
     */
    signOut: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/sign-out`,
        method: 'POST',
        ...params,
      }),
  };
}
